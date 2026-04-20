// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { UiProvider } from "#/contexts/ui/provider";
import { recommendationsMock } from "#/mocks/recommendations";

import { RecommendationShelf } from "./component";
import type { RecommendationShelfProps } from "./types";

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("embla-carousel-react", () => ({
  default: () => [vi.fn(), undefined],
}));

vi.mock("#/hooks/use-carousel-navigation/hook", () => ({
  useCarouselNavigation: vi.fn().mockReturnValue({
    canNavigatePrev: false,
    canNavigateNext: false,
    navigatePrev: vi.fn(),
    navigateNext: vi.fn(),
  }),
}));

const { useCarouselNavigation } = await import(
  "#/hooks/use-carousel-navigation/hook"
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
  chapters: recommendation.chapters,
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

  it("renders a card for each chapter", () => {
    renderComponent();

    for (const chapter of recommendation.chapters) {
      expect(screen.getByText(chapter.comic.title)).toBeInTheDocument();
    }
  });

  it("renders no cards when chapters are empty", () => {
    renderComponent({ chapters: [] });

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
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
});
