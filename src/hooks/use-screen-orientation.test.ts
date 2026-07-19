// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { ComicOrientation } from "#/types/comics";

import { useScreenOrientation } from "./use-screen-orientation";

const originalOrientationDescriptor = Object.getOwnPropertyDescriptor(
  window.screen,
  "orientation",
);

const setScreenOrientation = ({
  lock = vi.fn().mockResolvedValue(undefined),
  unlock = vi.fn(),
}: {
  lock?: ScreenOrientation["lock"];
  unlock?: ScreenOrientation["unlock"];
} = {}) => {
  Object.defineProperty(window.screen, "orientation", {
    configurable: true,
    value: { lock, unlock },
  });

  return { lock, unlock };
};

const renderScreenOrientation = (
  orientation: ComicOrientation,
  isFullscreen: boolean,
) =>
  renderHook(
    ({ nextOrientation, nextIsFullscreen }) =>
      useScreenOrientation(nextOrientation, nextIsFullscreen),
    {
      initialProps: {
        nextOrientation: orientation,
        nextIsFullscreen: isFullscreen,
      },
    },
  );

afterEach(() => {
  if (originalOrientationDescriptor) {
    Object.defineProperty(
      window.screen,
      "orientation",
      originalOrientationDescriptor,
    );
  } else {
    Reflect.deleteProperty(window.screen, "orientation");
  }

  vi.restoreAllMocks();
});

describe("useScreenOrientation()", () => {
  it("does not request an orientation outside fullscreen", () => {
    const { lock, unlock } = setScreenOrientation();

    renderScreenOrientation("landscape", false);

    expect(lock).not.toHaveBeenCalled();
    expect(unlock).not.toHaveBeenCalled();
  });

  it("locks the landscape orientation after entering fullscreen", () => {
    const { lock } = setScreenOrientation();
    const { rerender } = renderScreenOrientation("landscape", false);

    rerender({
      nextOrientation: "landscape",
      nextIsFullscreen: true,
    });

    expect(lock).toHaveBeenCalledOnce();
    expect(lock).toHaveBeenCalledWith("landscape");
  });

  it("locks the portrait orientation in fullscreen", () => {
    const { lock } = setScreenOrientation();

    renderScreenOrientation("portrait", true);

    expect(lock).toHaveBeenCalledOnce();
    expect(lock).toHaveBeenCalledWith("portrait");
  });

  it("unlocks the orientation after leaving fullscreen", () => {
    const { unlock } = setScreenOrientation();
    const { rerender } = renderScreenOrientation("landscape", true);

    rerender({
      nextOrientation: "landscape",
      nextIsFullscreen: false,
    });

    expect(unlock).toHaveBeenCalledOnce();
  });

  it("unlocks the orientation when unmounted in fullscreen", () => {
    const { unlock } = setScreenOrientation();
    const { unmount } = renderScreenOrientation("landscape", true);

    unmount();

    expect(unlock).toHaveBeenCalledOnce();
  });

  it("does nothing when the Screen Orientation API is unavailable", () => {
    Object.defineProperty(window.screen, "orientation", {
      configurable: true,
      value: undefined,
    });

    expect(() => renderScreenOrientation("landscape", true)).not.toThrow();
  });

  it("ignores rejected orientation lock requests", async () => {
    const lock = vi.fn().mockRejectedValue(new Error("Not supported"));
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    setScreenOrientation({ lock });
    renderScreenOrientation("landscape", true);

    await act(async () => undefined);

    expect(lock).toHaveBeenCalledWith("landscape");
    expect(consoleError).not.toHaveBeenCalled();
  });

  it("ignores synchronous lock and unlock failures", () => {
    const lock = vi.fn(() => {
      throw new Error("Lock failed");
    });
    const unlock = vi.fn(() => {
      throw new Error("Unlock failed");
    });

    setScreenOrientation({ lock, unlock });

    const { unmount } = renderScreenOrientation("portrait", true);

    expect(unmount).not.toThrow();
    expect(lock).toHaveBeenCalledWith("portrait");
    expect(unlock).toHaveBeenCalledOnce();
  });
});
