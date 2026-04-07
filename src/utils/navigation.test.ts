import { describe, expect, it, vi } from "vitest";

import { getBaseUrl } from "./navigation";

describe("getBaseUrl()", () => {
  it("returns the environment variable when HYSE_COMICS_BASE_URL is set", () => {
    vi.stubEnv("HYSE_COMICS_BASE_URL", "https://api.hysecomics.com");

    expect(getBaseUrl()).toBe("https://api.hysecomics.com");
  });

  it("returns the default localhost URL when HYSE_COMICS_BASE_URL is not set", () => {
    vi.stubEnv("HYSE_COMICS_BASE_URL", "");

    expect(getBaseUrl()).toBe("http://localhost:3001");
  });
});
