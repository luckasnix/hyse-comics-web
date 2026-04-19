// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { UiProvider } from "#/contexts/ui/provider";
import { chaptersMock, comicsMock } from "#/mocks/comics";

import { RecommendationCard } from "./component";
import type { RecommendationCardProps } from "./types";

const onReadButtonClickSpy = vi.fn();

const defaultProps: RecommendationCardProps = {
  chapterId: chaptersMock[0].id,
  title: comicsMock[0].title,
  synopsis: comicsMock[0].synopsis,
  imageUrl: comicsMock[0].thumbnailUrl,
  onReadButtonClick: onReadButtonClickSpy,
};

const renderComponent = (overrides = {}) =>
  render(
    <UiProvider>
      <RecommendationCard {...defaultProps} {...overrides} />
    </UiProvider>,
  );

const setupClipboard = (resolved: boolean) => {
  const writeText = resolved
    ? vi.fn().mockResolvedValue(undefined)
    : vi.fn().mockRejectedValue(new Error("denied"));

  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    writable: true,
    configurable: true,
  });

  return {
    writeText,
  };
};

afterEach(cleanup);

describe("<RecommendationCard />", () => {
  it("renders the thumbnail, title and synopsis", () => {
    renderComponent();

    expect(
      screen.getByTitle(`${defaultProps.title} thumbnail`),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.synopsis)).toBeInTheDocument();
  });

  it("renders the Share and Read buttons", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "Share" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Read" })).toBeInTheDocument();
  });

  it("calls onReadButtonClick with the chapter ID when Read is clicked", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("button", { name: "Read" }));

    expect(onReadButtonClickSpy).toHaveBeenCalledWith(defaultProps.chapterId);
  });

  it("copies the chapter link to the clipboard when Share is clicked", async () => {
    const user = userEvent.setup();
    const { writeText } = setupClipboard(true);

    renderComponent();

    await user.click(screen.getByRole("button", { name: "Share" }));

    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining(`/chapters/${defaultProps.chapterId}`),
    );
  });

  it("shows a success toast when the link is copied", async () => {
    const user = userEvent.setup();
    setupClipboard(true);

    renderComponent();

    await user.click(screen.getByRole("button", { name: "Share" }));

    expect(
      await screen.findByText("Link copied to clipboard."),
    ).toBeInTheDocument();
  });

  it("shows an error toast when copying fails", async () => {
    const user = userEvent.setup();
    setupClipboard(false);

    renderComponent();

    await user.click(screen.getByRole("button", { name: "Share" }));

    expect(
      await screen.findByText(
        "Failed to copy link to clipboard. Please try again.",
      ),
    ).toBeInTheDocument();
  });
});
