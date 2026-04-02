import { defineConfig } from "vitest/config";
import viteReact from "@vitejs/plugin-react";

const vitestConfig = defineConfig({
  plugins: [viteReact()],
  test: {
    watch: false,
    restoreMocks: true,
    passWithNoTests: true,
    coverage: {
      include: ["src/**/*.ts"],
    },
  },
});

export default vitestConfig;
