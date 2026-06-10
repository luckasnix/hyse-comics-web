import { describe, expect, it, vi } from "vitest";

import { getBaseUrl } from "./navigation";

describe("getBaseUrl()", () => {
  it("returns the environment variable when HYSE_COMICS_BASE_URL is set", () => {
    vi.stubEnv("HYSE_COMICS_BASE_URL", "https://api.hysecomics.com");

    expect(getBaseUrl()).toBe("https://api.hysecomics.com");
  });

  it("returns the development fallback URL when HYSE_COMICS_BASE_URL is not set", () => {
    vi.stubEnv("HYSE_COMICS_BASE_URL", "");
    vi.stubEnv("MODE", "development");

    expect(getBaseUrl()).toBe("http://localhost:3001");
  });

  it("returns the production fallback URL when HYSE_COMICS_BASE_URL is not set", () => {
    vi.stubEnv("HYSE_COMICS_BASE_URL", "");
    vi.stubEnv("MODE", "production");

    expect(getBaseUrl()).toBe("http://localhost:3000");
  });
});
