import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { comicsMock } from "#/mocks/comics.ts";

import {
  ContentWarningDialog,
  type ContentWarningDialogProps,
} from "./content-warning-dialog.tsx";

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
  it("renders the dialog title", async () => {
    await renderComponent();

    await expect.element(page.getByText("Content Warning")).toBeInTheDocument();
  });

  it("renders the comic title in the description", async () => {
    await renderComponent();

    await expect.element(page.getByText("Blood and Gold")).toBeInTheDocument();
  });

  it("renders all content warning chips", async () => {
    await renderComponent();

    await expect
      .element(page.getByText("Graphic Violence"))
      .toBeInTheDocument();
    await expect.element(page.getByText("Strong Language")).toBeInTheDocument();
    await expect.element(page.getByText("Substance Use")).toBeInTheDocument();
  });

  it("renders the acknowledgement checkbox unchecked by default", async () => {
    await renderComponent();

    await expect
      .element(
        page.getByRole("checkbox", {
          name: "I understand and wish to continue",
        }),
      )
      .not.toBeChecked();
  });

  it("renders the Continue button disabled by default", async () => {
    await renderComponent();

    await expect
      .element(page.getByRole("button", { name: "Continue" }))
      .toBeDisabled();
  });

  it("enables the Continue button after checking the acknowledgement checkbox", async () => {
    const user = userEvent.setup();

    await renderComponent();

    await user.click(
      page.getByRole("checkbox", {
        name: "I understand and wish to continue",
      }),
    );

    await expect
      .element(page.getByRole("button", { name: "Continue" }))
      .toBeEnabled();
  });

  it("calls onConfirm when Continue button is clicked after acknowledging", async () => {
    const user = userEvent.setup();

    await renderComponent();

    await user.click(
      page.getByRole("checkbox", {
        name: "I understand and wish to continue",
      }),
    );
    await user.click(page.getByRole("button", { name: "Continue" }));

    expect(onConfirmSpy).toHaveBeenCalledOnce();
  });

  it("calls onCancel when Go Back button is clicked", async () => {
    const user = userEvent.setup();

    await renderComponent();

    await user.click(page.getByRole("button", { name: "Go Back" }));

    expect(onCancelSpy).toHaveBeenCalledOnce();
  });

  it("resets the acknowledgement after going back", async () => {
    const user = userEvent.setup();

    await renderComponent();

    const checkbox = page.getByRole("checkbox", {
      name: "I understand and wish to continue",
    });

    await user.click(checkbox);
    await user.click(page.getByRole("button", { name: "Go Back" }));

    expect(checkbox).not.toBeChecked();
    await expect
      .element(page.getByRole("button", { name: "Continue" }))
      .toBeDisabled();
  });

  it("does not render the dialog when open is false", async () => {
    await renderComponent({ open: false });

    await expect
      .element(page.getByText("Content Warning"))
      .not.toBeInTheDocument();
  });
});
