// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { UiProvider } from "#/contexts/ui.tsx";
import { recommendationsMock } from "#/mocks/recommendations.ts";

import {
  RecommendationShelf,
  type RecommendationShelfProps,
} from "./recommendation-shelf.tsx";

const navigateSpy = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigateSpy,
  useParams: () => ({ locale: "en-US" }),
}));

vi.mock("embla-carousel-react", () => ({
  default: () => [vi.fn(), undefined],
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
  it("renders the shelf title", () => {
    renderComponent();

    expect(screen.getByText(recommendation.title)).toBeInTheDocument();
  });

  it("renders a card for each comic", () => {
    renderComponent();

    for (const comic of recommendation.comics) {
      expect(screen.getByText(comic.title)).toBeInTheDocument();
    }
  });

  it("renders no cards when comics are empty", () => {
    renderComponent({ comics: [] });

    expect(
      screen.queryByRole("button", { name: "Read" }),
    ).not.toBeInTheDocument();

    for (const comic of recommendation.comics) {
      expect(screen.queryByText(comic.title)).not.toBeInTheDocument();
    }
  });

  it("hides the Previous button when navigation is not available", () => {
    setupMock({ canNavigatePrev: false });

    renderComponent();

    expect(
      screen.queryByRole("button", { name: "Previous" }),
    ).not.toBeInTheDocument();
  });

  it("hides the Next button when navigation is not available", () => {
    setupMock({ canNavigateNext: false });

    renderComponent();

    expect(
      screen.queryByRole("button", { name: "Next" }),
    ).not.toBeInTheDocument();
  });

  it("renders the Previous button when navigation is available", () => {
    setupMock({ canNavigatePrev: true });

    renderComponent();

    expect(
      screen.getByRole("button", { name: "Previous" }),
    ).toBeInTheDocument();
  });

  it("renders the Next button when navigation is available", () => {
    setupMock({ canNavigateNext: true });

    renderComponent();

    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  it("navigates to the comic when the Read button is clicked", async () => {
    const user = userEvent.setup();
    setupMock();

    renderComponent();

    await user.click(screen.getAllByRole("button", { name: "Read" })[0]);

    expect(navigateSpy).toHaveBeenCalledWith({
      to: "/{-$locale}/comics/$comicId",
      params: { locale: "en-US", comicId: recommendation.comics[0].id },
    });
  });
});
