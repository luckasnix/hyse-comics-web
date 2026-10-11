import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const viteConfig = defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({ router: { addExtensions: true } }),
    viteReact({ compiler: { logDiagnostics: true } }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3001,
  },
  preview: {
    port: 3001,
  },
});

export default viteConfig;
