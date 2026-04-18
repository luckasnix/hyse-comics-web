// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { comicsMock } from "#/mocks/comics";

import { ContentWarningDialog } from "./component";
import type { ContentWarningDialogProps } from "./types";

const comic = comicsMock[3];

const onConfirmSpy = vi.fn();
const onCancelSpy = vi.fn();

const defaultProps: ContentWarningDialogProps = {
  contentWarnings: comic.contentWarnings,
  comicTitle: comic.title,
  open: true,
  onConfirm: onConfirmSpy,
  onCancel: onCancelSpy,
};

const renderComponent = (overrides: Partial<ContentWarningDialogProps> = {}) =>
  render(<ContentWarningDialog {...defaultProps} {...overrides} />);

afterEach(cleanup);

describe("<ContentWarningDialog />", () => {
  it("renders the dialog title", () => {
    renderComponent();

    expect(screen.getByText("Content Warning")).toBeInTheDocument();
  });

  it("renders the comic title in the description", () => {
    renderComponent();

    expect(screen.getByText("Blood and Gold")).toBeInTheDocument();
  });

  it("renders all content warning chips", () => {
    renderComponent();

    expect(screen.getByText("Graphic Violence")).toBeInTheDocument();
    expect(screen.getByText("Strong Language")).toBeInTheDocument();
    expect(screen.getByText("Substance Use")).toBeInTheDocument();
  });

  it("renders the acknowledgement checkbox unchecked by default", () => {
    renderComponent();

    expect(
      screen.getByRole("checkbox", {
        name: "I understand and wish to continue",
      }),
    ).not.toBeChecked();
  });

  it("renders the Continue button disabled by default", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
  });

  it("enables the Continue button after checking the acknowledgement checkbox", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(
      screen.getByRole("checkbox", {
        name: "I understand and wish to continue",
      }),
    );

    expect(screen.getByRole("button", { name: "Continue" })).toBeEnabled();
  });

  it("calls onConfirm when Continue button is clicked after acknowledging", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(
      screen.getByRole("checkbox", {
        name: "I understand and wish to continue",
      }),
    );
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(onConfirmSpy).toHaveBeenCalledOnce();
  });

  it("calls onCancel when Go Back button is clicked", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("button", { name: "Go Back" }));

    expect(onCancelSpy).toHaveBeenCalledOnce();
  });

  it("does not render the dialog when open is false", () => {
    renderComponent({ open: false });

    expect(screen.queryByText("Content Warning")).not.toBeInTheDocument();
  });
});
