// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useBoolean } from "./use-boolean";

describe("useBoolean()", () => {
  it("is false by default", () => {
    const { result } = renderHook(() => useBoolean());

    expect(result.current[0]).toBe(false);
  });

  it("uses the provided initial value", () => {
    const { result } = renderHook(() => useBoolean(true));

    expect(result.current[0]).toBe(true);
  });

  it("sets the value to true", () => {
    const { result } = renderHook(() => useBoolean());

    act(() => result.current[1].setTrue());

    expect(result.current[0]).toBe(true);
  });

  it("sets the value to false", () => {
    const { result } = renderHook(() => useBoolean(true));

    act(() => result.current[1].setFalse());

    expect(result.current[0]).toBe(false);
  });

  it("sets a specific value", () => {
    const { result } = renderHook(() => useBoolean());

    act(() => result.current[1].set(true));

    expect(result.current[0]).toBe(true);
  });

  it("toggles using the latest value", () => {
    const { result } = renderHook(() => useBoolean());

    act(() => {
      result.current[1].toggle();
      result.current[1].toggle();
      result.current[1].toggle();
    });

    expect(result.current[0]).toBe(true);
  });

  it("keeps the actions stable between renders", () => {
    const { result } = renderHook(() => useBoolean());
    const initialActions = result.current[1];

    act(() => result.current[1].setTrue());

    expect(result.current[1]).toBe(initialActions);
  });
});
