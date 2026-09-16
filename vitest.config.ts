import viteReact from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const vitestConfig = defineConfig({
  plugins: [viteReact()],
  optimizeDeps: {
    exclude: ["@tanstack/react-start"],
    include: ["vitest-browser-react/pure"],
  },
  test: {
    coverage: {
      include: ["./src/{components,contexts,hooks,pages,utils}/**/*.{ts,tsx}"],
      exclude: [
        "./src/{components,contexts,hooks,pages,utils}/**/types.{ts,tsx}",
      ],
    },
    restoreMocks: true,
    projects: [
      {
        extends: true,
        test: {
          name: "node",
          include: ["./src/utils/**/*.test.{ts,tsx}"],
        },
      },
      {
        extends: true,
        test: {
          name: "chromium",
          include: [
            "./src/{components,contexts,hooks,i18n,pages}/**/*.test.{ts,tsx}",
          ],
          setupFiles: ["./vitest.setup.ts"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
    watch: false,
  },
});

export default vitestConfig;
