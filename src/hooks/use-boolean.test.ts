import { describe, expect, it } from "vitest";
import { renderHook } from "vitest-browser-react/pure";

import { useBoolean } from "./use-boolean.ts";

describe("useBoolean()", () => {
  it("is false by default", async () => {
    const { result } = await renderHook(() => useBoolean());

    expect(result.current[0]).toBe(false);
  });

  it("uses the provided initial value", async () => {
    const { result } = await renderHook(() => useBoolean(true));

    expect(result.current[0]).toBe(true);
  });

  it("sets the value to true", async () => {
    const { act, result } = await renderHook(() => useBoolean());

    await act(() => result.current[1].setTrue());

    expect(result.current[0]).toBe(true);
  });

  it("sets the value to false", async () => {
    const { act, result } = await renderHook(() => useBoolean(true));

    await act(() => result.current[1].setFalse());

    expect(result.current[0]).toBe(false);
  });

  it("sets a specific value", async () => {
    const { act, result } = await renderHook(() => useBoolean());

    await act(() => result.current[1].set(true));

    expect(result.current[0]).toBe(true);
  });

  it("toggles using the latest value", async () => {
    const { act, result } = await renderHook(() => useBoolean());

    await act(() => {
      result.current[1].toggle();
      result.current[1].toggle();
      result.current[1].toggle();
    });

    expect(result.current[0]).toBe(true);
  });

  it("keeps the actions stable between renders", async () => {
    const { act, result } = await renderHook(() => useBoolean());
    const initialActions = result.current[1];

    await act(() => result.current[1].setTrue());

    expect(result.current[1]).toBe(initialActions);
  });
});
