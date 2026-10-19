// Modified by Brabo, 2026-10-19: local tagger distribution and Nitro Vite integration (last plugin).
import { defineConfig } from "vite";
import dyadComponentTagger from "@brabo/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { nitro } from "nitro/vite";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [dyadComponentTagger(), react(), nitro()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
