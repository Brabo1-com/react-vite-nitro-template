// Brabo integration tests, 2026-10-19; Apache-2.0.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import { test } from "node:test";

const cwd = fileURLToPath(new URL("../", import.meta.url));

async function freePort() {
  const server = createServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const port = server.address().port;
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
  return port;
}

async function stopServer(child) {
  if (child.exitCode !== null) return;
  try {
    if (process.platform === "win32") child.kill("SIGTERM");
    else process.kill(-child.pid, "SIGTERM");
  } catch (error) {
    if (error.code !== "ESRCH") throw error;
  }
  await Promise.race([once(child, "exit"), delay(2000)]);
  // Only the process group created by this test can receive the fallback signal.
  if (process.platform !== "win32") {
    try {
      process.kill(-child.pid, "SIGKILL");
    } catch (error) {
      if (error.code !== "ESRCH") throw error;
    }
  }
}

async function withServer(mode, run) {
  const port = await freePort();
  const args =
    mode === "dev"
      ? [
          "node_modules/vite/bin/vite.js",
          "--host",
          "127.0.0.1",
          "--port",
          String(port),
          "--strictPort",
        ]
      : [".output/server/index.mjs"];
  let output = "";
  const child = spawn(process.execPath, args, {
    cwd,
    detached: process.platform !== "win32",
    env: {
      ...process.env,
      PORT: String(port),
      HOST: "127.0.0.1",
      NITRO_PORT: String(port),
      NITRO_HOST: "127.0.0.1",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.stdout.on("data", (chunk) => {
    output += chunk;
  });
  child.stderr.on("data", (chunk) => {
    output += chunk;
  });
  const base = `http://127.0.0.1:${port}`;
  const get = (path) =>
    fetch(base + path, { signal: AbortSignal.timeout(10000) });
  try {
    const deadline = Date.now() + 45000;
    let ready = false;
    while (Date.now() < deadline && child.exitCode === null) {
      try {
        const response = await get("/api/hello");
        if (
          response.ok &&
          response.headers.get("content-type")?.includes("application/json")
        ) {
          await response.arrayBuffer();
          ready = true;
          break;
        }
        await response.arrayBuffer();
      } catch {
        /* A server which is still starting can refuse connections. */
      }
      await delay(150);
    }
    assert.ok(ready, `${mode} server did not become ready:\n${output}`);
    await run(get);
  } finally {
    await stopServer(child);
  }
}

async function assertPageAndApi(get) {
  const api = await get("/api/hello");
  assert.equal(api.status, 200);
  assert.match(api.headers.get("content-type"), /application\/json/);
  assert.deepEqual(await api.json(), { message: "Hello Nitro!" });
  for (const path of ["/", "/router-fallback-check"]) {
    const page = await get(path);
    assert.equal(page.status, 200);
    assert.match(page.headers.get("content-type"), /text\/html/);
    assert.match(await page.text(), /Brabo React Vite Nitro/);
  }
  const icon = await get("/favicon.svg");
  assert.equal(icon.status, 200);
  assert.match(await icon.text(), /<svg/);
}

test(
  "development serves API, SPA and Vite modules with component tagging",
  { timeout: 65000 },
  async () => {
    await withServer("dev", async (get) => {
      await assertPageAndApi(get);
      const client = await get("/@vite/client");
      assert.equal(client.status, 200);
      assert.doesNotMatch(await client.text(), /<!doctype html>/i);
      const pageModule = await get("/src/pages/Index.tsx");
      assert.equal(pageModule.status, 200);
      const code = await pageModule.text();
      assert.doesNotMatch(code, /<!doctype html>/i);
      assert.match(code, /data-dyad-id/);
      assert.match(code, /data-dyad-name/);
    });
  },
);

test(
  "production output serves the same API, SPA and local asset",
  { timeout: 65000 },
  async () => {
    await withServer("production", assertPageAndApi);
  },
);
