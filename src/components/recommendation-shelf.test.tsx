import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { UiProvider } from "#/contexts/ui.tsx";
import { recommendationsMock } from "#/mocks/recommendations.ts";

import {
  RecommendationShelf,
  type RecommendationShelfProps,
} from "./recommendation-shelf.tsx";

const navigateSpy = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  isRedirect: () => false,
  useNavigate: () => navigateSpy,
  useParams: () => ({ locale: "en-US" }),
}));

vi.mock("embla-carousel-react", () => ({
  default: () => [vi.fn(), undefined],
}));

vi.mock("#/utils/navigation.ts", () => ({
  getBaseUrl: vi.fn().mockResolvedValue("https://comics.hyse.dev"),
}));

vi.mock("#/hooks/use-carousel-navigation.ts", () => ({
  useCarouselNavigation: vi.fn().mockReturnValue({
    canNavigatePrev: false,
    canNavigateNext: false,
    navigatePrev: vi.fn(),
    navigateNext: vi.fn(),
  }),
}));

const { useCarouselNavigation } = await import(
  "#/hooks/use-carousel-navigation.ts"
);

const useCarouselNavigationMock = vi.mocked(useCarouselNavigation);

const setupMock = ({
  canNavigatePrev = false,
  canNavigateNext = false,
} = {}) => {
  useCarouselNavigationMock.mockReturnValue({
    currentSlideNumber: null,
    slidesLength: null,
    canNavigateFirst: false,
    canNavigatePrev,
    canNavigateNext,
    canNavigateLast: false,
    navigateFirst: vi.fn(),
    navigatePrev: vi.fn(),
    navigateNext: vi.fn(),
    navigateLast: vi.fn(),
  });
};

const recommendation = recommendationsMock[0];

const defaultProps: RecommendationShelfProps = {
  title: recommendation.title,
  comics: recommendation.comics,
};

const renderComponent = (overrides: Partial<RecommendationShelfProps> = {}) =>
  render(
    <UiProvider>
      <RecommendationShelf {...defaultProps} {...overrides} />
    </UiProvider>,
  );

afterEach(cleanup);

describe("<RecommendationShelf />", () => {
  it("renders the shelf title", async () => {
    await renderComponent();

    await expect
      .element(page.getByText(recommendation.title))
      .toBeInTheDocument();
  });

  it("renders a card for each comic", async () => {
    await renderComponent();

    for (const comic of recommendation.comics) {
      await expect.element(page.getByText(comic.title)).toBeInTheDocument();
    }
  });

  it("renders no cards when comics are empty", async () => {
    await renderComponent({ comics: [] });

    await expect
      .element(page.getByRole("button", { name: "Read" }))
      .not.toBeInTheDocument();

    for (const comic of recommendation.comics) {
      await expect.element(page.getByText(comic.title)).not.toBeInTheDocument();
    }
  });

  it("hides the Previous button when navigation is not available", async () => {
    setupMock({ canNavigatePrev: false });

    await renderComponent();

    await expect
      .element(page.getByRole("button", { name: "Previous" }))
      .not.toBeInTheDocument();
  });

  it("hides the Next button when navigation is not available", async () => {
    setupMock({ canNavigateNext: false });

    await renderComponent();

    await expect
      .element(page.getByRole("button", { name: "Next" }))
      .not.toBeInTheDocument();
  });

  it("renders the Previous button when navigation is available", async () => {
    setupMock({ canNavigatePrev: true });

    await renderComponent();

    await expect
      .element(page.getByRole("button", { name: "Previous" }))
      .toBeInTheDocument();
  });

  it("renders the Next button when navigation is available", async () => {
    setupMock({ canNavigateNext: true });

    await renderComponent();

    await expect
      .element(page.getByRole("button", { name: "Next" }))
      .toBeInTheDocument();
  });

  it("navigates to the comic when the Read button is clicked", async () => {
    const user = userEvent.setup();
    setupMock();

    await renderComponent();

    await user.click(page.getByRole("button", { name: "Read" }).first());

    expect(navigateSpy).toHaveBeenCalledWith({
      to: "/{-$locale}/comics/$comicId",
      params: { locale: "en-US", comicId: recommendation.comics[0].id },
    });
  });
});
