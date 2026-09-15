import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "vitest-browser-react/pure";

import type { ComicOrientation } from "#/types/comics.ts";

import { useScreenOrientation } from "./use-screen-orientation.ts";

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
    (props) =>
      useScreenOrientation(
        props?.nextOrientation ?? orientation,
        props?.nextIsFullscreen ?? isFullscreen,
      ),
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
  it("does not request an orientation outside fullscreen", async () => {
    const { lock, unlock } = setScreenOrientation();

    await renderScreenOrientation("landscape", false);

    expect(lock).not.toHaveBeenCalled();
    expect(unlock).not.toHaveBeenCalled();
  });

  it("locks the landscape orientation after entering fullscreen", async () => {
    const { lock } = setScreenOrientation();
    const { rerender } = await renderScreenOrientation("landscape", false);

    await rerender({
      nextOrientation: "landscape",
      nextIsFullscreen: true,
    });

    expect(lock).toHaveBeenCalledOnce();
    expect(lock).toHaveBeenCalledWith("landscape");
  });

  it("locks the portrait orientation in fullscreen", async () => {
    const { lock } = setScreenOrientation();

    await renderScreenOrientation("portrait", true);

    expect(lock).toHaveBeenCalledOnce();
    expect(lock).toHaveBeenCalledWith("portrait");
  });

  it("unlocks the orientation after leaving fullscreen", async () => {
    const { unlock } = setScreenOrientation();
    const { rerender } = await renderScreenOrientation("landscape", true);

    await rerender({
      nextOrientation: "landscape",
      nextIsFullscreen: false,
    });

    expect(unlock).toHaveBeenCalledOnce();
  });

  it("unlocks the orientation when unmounted in fullscreen", async () => {
    const { unlock } = setScreenOrientation();
    const { unmount } = await renderScreenOrientation("landscape", true);

    await unmount();

    expect(unlock).toHaveBeenCalledOnce();
  });

  it("does nothing when the Screen Orientation API is unavailable", async () => {
    Object.defineProperty(window.screen, "orientation", {
      configurable: true,
      value: undefined,
    });

    await renderScreenOrientation("landscape", true);
  });

  it("ignores rejected orientation lock requests", async () => {
    const lock = vi.fn().mockRejectedValue(new Error("Not supported"));
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    setScreenOrientation({ lock });
    const { act } = await renderScreenOrientation("landscape", true);

    await act(async () => undefined);

    expect(lock).toHaveBeenCalledWith("landscape");
    expect(consoleError).not.toHaveBeenCalled();
  });

  it("ignores synchronous lock and unlock failures", async () => {
    const lock = vi.fn(() => {
      throw new Error("Lock failed");
    });
    const unlock = vi.fn(() => {
      throw new Error("Unlock failed");
    });

    setScreenOrientation({ lock, unlock });

    const { unmount } = await renderScreenOrientation("portrait", true);

    await unmount();
    expect(lock).toHaveBeenCalledWith("portrait");
    expect(unlock).toHaveBeenCalledOnce();
  });
});
