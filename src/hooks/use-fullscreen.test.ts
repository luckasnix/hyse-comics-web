// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useFullscreen } from "./use-fullscreen";

const originalFullscreenElementDescriptor = Object.getOwnPropertyDescriptor(
  document,
  "fullscreenElement",
);

const originalFullscreenEnabledDescriptor = Object.getOwnPropertyDescriptor(
  document,
  "fullscreenEnabled",
);

const originalExitFullscreenDescriptor = Object.getOwnPropertyDescriptor(
  document,
  "exitFullscreen",
);

const restoreDocumentProperty = (
  property: "exitFullscreen" | "fullscreenElement" | "fullscreenEnabled",
  descriptor: PropertyDescriptor | undefined,
) => {
  if (descriptor) {
    Object.defineProperty(document, property, descriptor);
    return;
  }

  Reflect.deleteProperty(document, property);
};

type FullscreenApiOptions = Readonly<{
  enabled?: boolean;
  fullscreenElement?: Element | null;
  requestError?: Error;
  exitError?: Error;
}>;

const setFullscreenApi = (
  target: Element,
  {
    enabled = true,
    fullscreenElement: initialFullscreenElement = null,
    requestError,
    exitError,
  }: FullscreenApiOptions = {},
) => {
  let fullscreenElement = initialFullscreenElement;

  Object.defineProperty(document, "fullscreenEnabled", {
    configurable: true,
    value: enabled,
  });

  Object.defineProperty(document, "fullscreenElement", {
    configurable: true,
    get: () => fullscreenElement,
  });

  const requestFullscreen = vi.fn(() => {
    if (requestError) {
      return Promise.reject(requestError);
    }

    fullscreenElement = target;
    document.dispatchEvent(new Event("fullscreenchange"));
    return Promise.resolve();
  });

  const exitFullscreen = vi.fn(() => {
    if (exitError) {
      return Promise.reject(exitError);
    }

    fullscreenElement = null;
    document.dispatchEvent(new Event("fullscreenchange"));
    return Promise.resolve();
  });

  Object.defineProperty(target, "requestFullscreen", {
    configurable: true,
    value: requestFullscreen,
  });

  Object.defineProperty(document, "exitFullscreen", {
    configurable: true,
    value: exitFullscreen,
  });

  const changeFullscreenElement = (element: Element | null) => {
    fullscreenElement = element;
    document.dispatchEvent(new Event("fullscreenchange"));
  };

  return {
    requestFullscreen,
    exitFullscreen,
    changeFullscreenElement,
  };
};

afterEach(() => {
  restoreDocumentProperty(
    "fullscreenElement",
    originalFullscreenElementDescriptor,
  );
  restoreDocumentProperty(
    "fullscreenEnabled",
    originalFullscreenEnabledDescriptor,
  );
  restoreDocumentProperty("exitFullscreen", originalExitFullscreenDescriptor);

  vi.restoreAllMocks();
});

describe("useFullscreen()", () => {
  it("is inactive by default", () => {
    const target = document.createElement("section");
    setFullscreenApi(target);
    const targetRef = { current: target };

    const { result } = renderHook(() => useFullscreen(targetRef));

    expect(result.current[0]).toBe(false);
    expect(result.current[1].isEnabled).toBe(true);
  });

  it("detects when its target is already fullscreen", () => {
    const target = document.createElement("section");
    setFullscreenApi(target, { fullscreenElement: target });
    const targetRef = { current: target };

    const { result } = renderHook(() => useFullscreen(targetRef));

    expect(result.current[0]).toBe(true);
  });

  it("enters fullscreen", () => {
    const target = document.createElement("section");
    const { requestFullscreen } = setFullscreenApi(target);
    const targetRef = { current: target };
    const { result } = renderHook(() => useFullscreen(targetRef));

    act(() => result.current[1].enterFullscreen());

    expect(requestFullscreen).toHaveBeenCalledOnce();
    expect(result.current[0]).toBe(true);
  });

  it("exits fullscreen", () => {
    const target = document.createElement("section");
    const { exitFullscreen } = setFullscreenApi(target, {
      fullscreenElement: target,
    });
    const targetRef = { current: target };
    const { result } = renderHook(() => useFullscreen(targetRef));

    act(() => result.current[1].exitFullscreen());

    expect(exitFullscreen).toHaveBeenCalledOnce();
    expect(result.current[0]).toBe(false);
  });

  it("toggles fullscreen using the document state", () => {
    const target = document.createElement("section");
    const { requestFullscreen, exitFullscreen } = setFullscreenApi(target);
    const targetRef = { current: target };
    const { result } = renderHook(() => useFullscreen(targetRef));

    act(() => result.current[1].toggleFullscreen());

    expect(requestFullscreen).toHaveBeenCalledOnce();
    expect(result.current[0]).toBe(true);

    act(() => result.current[1].toggleFullscreen());

    expect(exitFullscreen).toHaveBeenCalledOnce();
    expect(result.current[0]).toBe(false);
  });

  it("updates after fullscreen is exited externally", () => {
    const target = document.createElement("section");
    const { changeFullscreenElement } = setFullscreenApi(target, {
      fullscreenElement: target,
    });
    const targetRef = { current: target };
    const { result } = renderHook(() => useFullscreen(targetRef));

    act(() => changeFullscreenElement(null));

    expect(result.current[0]).toBe(false);
  });

  it("is inactive when another element is fullscreen", () => {
    const target = document.createElement("section");
    const otherElement = document.createElement("div");
    setFullscreenApi(target, { fullscreenElement: otherElement });
    const targetRef = { current: target };

    const { result } = renderHook(() => useFullscreen(targetRef));

    expect(result.current[0]).toBe(false);
  });

  it("does nothing when fullscreen is unavailable", () => {
    const target = document.createElement("section");
    const { requestFullscreen } = setFullscreenApi(target, { enabled: false });
    const targetRef = { current: target };
    const { result } = renderHook(() => useFullscreen(targetRef));

    act(() => result.current[1].enterFullscreen());

    expect(result.current[1].isEnabled).toBe(false);
    expect(requestFullscreen).not.toHaveBeenCalled();
    expect(result.current[0]).toBe(false);
  });

  it("does nothing while the target is unavailable", () => {
    const target = document.createElement("section");
    const { requestFullscreen, exitFullscreen } = setFullscreenApi(target);
    const targetRef = { current: null };
    const { result } = renderHook(() => useFullscreen(targetRef));

    expect(() => {
      result.current[1].enterFullscreen();
      result.current[1].exitFullscreen();
      result.current[1].toggleFullscreen();
    }).not.toThrow();
    expect(requestFullscreen).not.toHaveBeenCalled();
    expect(exitFullscreen).not.toHaveBeenCalled();
  });

  it("ignores rejected fullscreen requests", async () => {
    const target = document.createElement("section");
    const requestError = new Error("Request failed");
    const { requestFullscreen } = setFullscreenApi(target, { requestError });
    const targetRef = { current: target };
    const { result } = renderHook(() => useFullscreen(targetRef));

    await act(async () => {
      result.current[1].enterFullscreen();
      await Promise.resolve();
    });

    expect(requestFullscreen).toHaveBeenCalledOnce();
    expect(result.current[0]).toBe(false);
  });

  it("ignores rejected fullscreen exits", async () => {
    const target = document.createElement("section");
    const exitError = new Error("Exit failed");
    const { exitFullscreen } = setFullscreenApi(target, {
      fullscreenElement: target,
      exitError,
    });
    const targetRef = { current: target };
    const { result } = renderHook(() => useFullscreen(targetRef));

    await act(async () => {
      result.current[1].exitFullscreen();
      await Promise.resolve();
    });

    expect(exitFullscreen).toHaveBeenCalledOnce();
    expect(result.current[0]).toBe(true);
  });

  it("removes the fullscreen listener when unmounted", () => {
    const target = document.createElement("section");
    setFullscreenApi(target);
    const targetRef = { current: target };
    const addEventListener = vi.spyOn(document, "addEventListener");
    const removeEventListener = vi.spyOn(document, "removeEventListener");
    const { unmount } = renderHook(() => useFullscreen(targetRef));
    const listener = addEventListener.mock.calls.find(
      ([event]) => event === "fullscreenchange",
    )?.[1];

    unmount();

    expect(listener).toEqual(expect.any(Function));
    expect(removeEventListener).toHaveBeenCalledWith(
      "fullscreenchange",
      listener,
    );
  });

  it("keeps the actions stable between fullscreen changes", () => {
    const target = document.createElement("section");
    setFullscreenApi(target);
    const targetRef = { current: target };
    const { result } = renderHook(() => useFullscreen(targetRef));
    const initialActions = result.current[1];

    act(() => result.current[1].enterFullscreen());

    expect(result.current[1]).toBe(initialActions);
  });
});
