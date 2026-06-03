// @vitest-environment jsdom
import {
  cleanup,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";

import { useUi } from "./hook";
import { UiProvider } from "./provider";

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
  it("renders children inside UiProvider", () => {
    render(
      <UiProvider>
        <span>Provider child</span>
      </UiProvider>,
    );

    expect(screen.getByText("Provider child")).toBeInTheDocument();
  });

  it("provides showToast through UiProvider", () => {
    const { result } = renderHook(() => useUi(), { wrapper });

    expect(result.current.showToast).toEqual(expect.any(Function));
  });

  it("renders a toast when showToast is called", async () => {
    const user = userEvent.setup();

    render(
      <UiProvider>
        <ToastTrigger />
      </UiProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Show toast" }));

    expect(
      await screen.findByText("Operation completed successfully."),
    ).toBeInTheDocument();
  });

  it("closes the toast when the close button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <UiProvider>
        <ToastTrigger />
      </UiProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Show toast" }));

    expect(
      await screen.findByText("Operation completed successfully."),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close" }));

    await waitFor(() => {
      expect(
        screen.queryByText("Operation completed successfully."),
      ).not.toBeInTheDocument();
    });
  });

  it("throws when accessed outside UiProvider", () => {
    expect(() => renderHook(() => useUi())).toThrow(
      "The hook 'useUi' must be used inside 'UiProvider'.",
    );
  });
});
