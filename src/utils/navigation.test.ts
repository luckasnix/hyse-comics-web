import { beforeEach, describe, expect, it, vi } from "vitest";

import { getBaseUrl } from "./navigation";

const getRuntimeOriginMock = vi.hoisted(() => vi.fn());

vi.mock("@tanstack/react-start", () => ({
  createIsomorphicFn: () => ({
    server: () => ({
      client: () => getRuntimeOriginMock,
    }),
  }),
}));

beforeEach(() => {
  vi.unstubAllEnvs();
  getRuntimeOriginMock.mockReset();
  getRuntimeOriginMock.mockResolvedValue("https://preview-123.comics.hyse.dev");
});

describe("getBaseUrl()", () => {
  it("returns the active runtime origin", async () => {
    await expect(getBaseUrl()).resolves.toBe(
      "https://preview-123.comics.hyse.dev",
    );
    expect(getRuntimeOriginMock).toHaveBeenCalledOnce();
  });
});
