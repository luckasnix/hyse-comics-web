import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const vitestConfig = defineConfig({
  plugins: [viteReact()],
  test: {
    coverage: {
      include: ["./src/{components,contexts,hooks,utils}/**/*.{ts,tsx}"],
      exclude: ["./src/{components,contexts,hooks,utils}/**/types.{ts,tsx}"],
    },
    passWithNoTests: true,
    restoreMocks: true,
    setupFiles: ["./vitest.setup.ts"],
    watch: false,
  },
});

export default vitestConfig;
