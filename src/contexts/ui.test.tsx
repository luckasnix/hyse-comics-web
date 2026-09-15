import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render, renderHook } from "vitest-browser-react/pure";

import { UiProvider, useUi } from "./ui.tsx";

const wrapper = ({ children }: { children: ReactNode }) => (
  <UiProvider>{children}</UiProvider>
);

const ToastTrigger = () => {
  const { showToast } = useUi();

  return (
    <button
      type="button"
      onClick={() => {
        showToast({
          severity: "success",
          message: "Operation completed successfully.",
        });
      }}
    >
      Show toast
    </button>
  );
};

afterEach(cleanup);

describe("UiContext", () => {
  it("renders children inside UiProvider", async () => {
    await render(
      <UiProvider>
        <span>Provider child</span>
      </UiProvider>,
    );

    await expect.element(page.getByText("Provider child")).toBeInTheDocument();
  });

  it("provides showToast through UiProvider", async () => {
    const { result } = await renderHook(() => useUi(), { wrapper });

    expect(result.current.showToast).toEqual(expect.any(Function));
  });

  it("renders a toast when showToast is called", async () => {
    const user = userEvent.setup();

    await render(
      <UiProvider>
        <ToastTrigger />
      </UiProvider>,
    );

    await user.click(page.getByRole("button", { name: "Show toast" }));

    await expect
      .element(page.getByText("Operation completed successfully."))
      .toBeInTheDocument();
  });

  it("closes the toast when the close button is clicked", async () => {
    const user = userEvent.setup();

    await render(
      <UiProvider>
        <ToastTrigger />
      </UiProvider>,
    );

    await user.click(page.getByRole("button", { name: "Show toast" }));

    await expect
      .element(page.getByText("Operation completed successfully."))
      .toBeInTheDocument();

    await user.click(page.getByRole("button", { name: "Close" }));

    await expect
      .element(page.getByText("Operation completed successfully."))
      .not.toBeInTheDocument();
  });

  it("throws when accessed outside UiProvider", async () => {
    await expect(renderHook(() => useUi())).rejects.toThrow(
      "The hook 'useUi' must be used inside 'UiProvider'.",
    );
  });
});
