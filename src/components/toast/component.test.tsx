// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Toast } from "./component";
import type { ToastProps } from "./types";

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
  it("renders the message when open", () => {
    renderComponent();

    expect(
      screen.getByText("Operation completed successfully."),
    ).toBeInTheDocument();
  });

  it("renders with the correct severity", () => {
    renderComponent({ severity: "error" });

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("does not render the message when closed", () => {
    renderComponent({ open: false });

    expect(
      screen.queryByText("Operation completed successfully."),
    ).not.toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onCloseSpy).toHaveBeenCalledOnce();
  });
});
