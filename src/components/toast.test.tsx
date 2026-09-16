import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { Toast, type ToastProps } from "./toast.tsx";

const onCloseSpy = vi.fn();

const defaultProps: ToastProps = {
  open: true,
  onClose: onCloseSpy,
  severity: "success",
  message: "Operation completed successfully.",
};

const renderComponent = (overrides: Partial<ToastProps> = {}) =>
  render(<Toast {...defaultProps} {...overrides} />);

afterEach(cleanup);

describe("<Toast />", () => {
  it("renders the message when open", async () => {
    await renderComponent();

    await expect
      .element(page.getByText("Operation completed successfully."))
      .toBeInTheDocument();
  });

  it("renders with the correct severity", async () => {
    await renderComponent({ severity: "error" });

    await expect
      .element(page.getByRole("alert"))
      .toHaveClass("MuiAlert-colorError", "MuiAlert-filled");
  });

  it("does not render the message when closed", async () => {
    await renderComponent({ open: false });

    await expect
      .element(page.getByText("Operation completed successfully."))
      .not.toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    const user = userEvent.setup();

    await renderComponent();

    await user.click(page.getByRole("button", { name: "Close" }));

    expect(onCloseSpy).toHaveBeenCalledOnce();
  });
});
