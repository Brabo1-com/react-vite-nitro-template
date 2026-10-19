# Brabo React + Vite + Nitro

Prepared locally, without publication, from independently verified Apache-licensed Dyad scaffold/helper sources plus Brabo integration code. See LICENSE, THIRD_PARTY_NOTICES.md and BRABO_SOURCE.json. This is an independent Brabo adaptation; historical Dyad and third-party credits remain.

Use Node.js 22.16.0 or newer and pnpm 10.11.0. Inside this folder:

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm ts
pnpm build
pnpm test
pnpm start
```

The frontend keeps React Router, all copied UI components and component-selection tagging. The Nitro Vite plugin runs last; `/api/hello` returns `{ "message": "Hello Nitro!" }`. The tagger is vendored locally and requires no npm account/publication. No credentials are required for the blank frontend or sample API. Future backend integrations use their own environment variables on the server, never browser VITE_* secrets.

`pnpm build` produces the Node server under `.output`; `pnpm start` runs it. Vite's dev/preview scripts remain available. For Vercel, Nitro selects the provider from its environment/preset; the old SPA-only catch-all rewrite was removed so API routes are not redirected to HTML. A local `NITRO_PRESET=vercel pnpm build` was verified to emit Build Output API v3, including the API server function. No deploy or external integration is certified by this artifact check.

The pnpm lock is canonical; the inconsistent reference npm lock is not distributed. Keep node_modules, dist, .output, .nitro, .env and logs out of the source repository. `BRABO_CHANGES.md` records preparation changes and remaining release checks. Publication to the Brabo organization was explicitly authorized by the owner on 2026-10-19.
