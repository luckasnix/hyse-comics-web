import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { UiProvider } from "#/contexts/ui.tsx";
import { comicsMock } from "#/mocks/comics.ts";

import {
  RecommendationCard,
  type RecommendationCardProps,
} from "./recommendation-card.tsx";

const onReadButtonClickSpy = vi.fn();
const useParamsMock = vi.hoisted(() =>
  vi.fn<() => { locale?: string }>(() => ({ locale: "en-US" })),
);
const getBaseUrlMock = vi.hoisted(() =>
  vi.fn(() => Promise.resolve("https://preview-123.comics.hyse.dev")),
);

vi.mock("@tanstack/react-router", () => ({
  useParams: useParamsMock,
}));

vi.mock("#/utils/navigation.ts", () => ({
  getBaseUrl: getBaseUrlMock,
}));

const defaultProps: RecommendationCardProps = {
  comicId: comicsMock[0].id,
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
  it("renders the thumbnail, title and synopsis", async () => {
    await renderComponent();

    await expect
      .element(page.getByTitle(`${defaultProps.title} thumbnail`))
      .toBeInTheDocument();
    await expect
      .element(page.getByText(defaultProps.title))
      .toBeInTheDocument();
    await expect
      .element(page.getByText(defaultProps.synopsis))
      .toBeInTheDocument();
  });

  it("renders the Share and Read buttons", async () => {
    await renderComponent();

    await expect
      .element(page.getByRole("button", { name: "Share" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("button", { name: "Read" }))
      .toBeInTheDocument();
  });

  it("calls onReadButtonClick with the comic ID when Read is clicked", async () => {
    const user = userEvent.setup();

    await renderComponent();

    await user.click(page.getByRole("button", { name: "Read" }));

    expect(onReadButtonClickSpy).toHaveBeenCalledWith(defaultProps.comicId);
  });

  it("copies the comic link to the clipboard when Share is clicked", async () => {
    const user = userEvent.setup();
    const { writeText } = setupClipboard(true);

    await renderComponent();

    await user.click(page.getByRole("button", { name: "Share" }));

    expect(writeText).toHaveBeenCalledWith(
      `https://preview-123.comics.hyse.dev/en-US/comics/${defaultProps.comicId}`,
    );
  });

  it("copies the comic link without a locale when the route has none", async () => {
    const user = userEvent.setup();
    const { writeText } = setupClipboard(true);
    useParamsMock.mockReturnValueOnce({});

    await renderComponent();

    await user.click(page.getByRole("button", { name: "Share" }));

    expect(writeText).toHaveBeenCalledWith(
      `https://preview-123.comics.hyse.dev/comics/${defaultProps.comicId}`,
    );
  });

  it("shows a success toast when the link is copied", async () => {
    const user = userEvent.setup();
    setupClipboard(true);

    await renderComponent();

    await user.click(page.getByRole("button", { name: "Share" }));

    await expect
      .element(page.getByText("Link copied to clipboard."))
      .toBeInTheDocument();
  });

  it("shows an error toast when copying fails", async () => {
    const user = userEvent.setup();
    setupClipboard(false);

    await renderComponent();

    await user.click(page.getByRole("button", { name: "Share" }));

    await expect
      .element(
        page.getByText("Failed to copy link to clipboard. Please try again."),
      )
      .toBeInTheDocument();
  });
});
