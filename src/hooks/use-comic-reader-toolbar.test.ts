import { describe, expect, it, vi } from "vitest";
import { renderHook } from "vitest-browser-react/pure";

import { useComicReaderToolbar } from "./use-comic-reader-toolbar.ts";

vi.mock("#/hooks/use-carousel-navigation.ts", () => ({
  useCarouselNavigation: vi.fn().mockReturnValue({
    currentSlideNumber: null,
    slidesLength: null,
    canNavigateFirst: false,
    canNavigatePrev: false,
    canNavigateNext: false,
    canNavigateLast: false,
    navigateFirst: vi.fn(),
    navigatePrev: vi.fn(),
    navigateNext: vi.fn(),
    navigateLast: vi.fn(),
  }),
}));

const { useCarouselNavigation } = await import(
  "#/hooks/use-carousel-navigation.ts"
);

const useCarouselNavigationMock = vi.mocked(useCarouselNavigation);

const navigateFirstSpy = vi.fn();
const navigatePrevSpy = vi.fn();
const navigateNextSpy = vi.fn();
const navigateLastSpy = vi.fn();

const setupMock = ({
  canNavigateFirst = false,
  canNavigatePrev = false,
  canNavigateNext = false,
  canNavigateLast = false,
  currentSlideNumber = null as number | null,
  slidesLength = null as number | null,
} = {}) => {
  useCarouselNavigationMock.mockReturnValue({
    currentSlideNumber,
    slidesLength,
    canNavigateFirst,
    canNavigatePrev,
    canNavigateNext,
    canNavigateLast,
    navigateFirst: navigateFirstSpy,
    navigatePrev: navigatePrevSpy,
    navigateNext: navigateNextSpy,
    navigateLast: navigateLastSpy,
  });
};

describe("useComicReaderToolbar()", () => {
  describe("when direction is LTR", () => {
    it("maps navigation to left-to-right order", async () => {
      setupMock({
        canNavigateFirst: true,
        canNavigatePrev: true,
        canNavigateNext: true,
        canNavigateLast: true,
      });

      const { result } = await renderHook(() =>
        useComicReaderToolbar(undefined, "ltr"),
      );

      expect(result.current.buttons.farLeft).toEqual({
        label: "First page (shift + ←)",
        disabled: false,
        onClick: navigateFirstSpy,
      });
      expect(result.current.buttons.left).toEqual({
        label: "Previous page (←)",
        disabled: false,
        onClick: navigatePrevSpy,
      });
      expect(result.current.buttons.right).toEqual({
        label: "Next page (→)",
        disabled: false,
        onClick: navigateNextSpy,
      });
      expect(result.current.buttons.farRight).toEqual({
        label: "Last page (shift + →)",
        disabled: false,
        onClick: navigateLastSpy,
      });
    });

    it("disables buttons when navigation is not available", async () => {
      setupMock();

      const { result } = await renderHook(() =>
        useComicReaderToolbar(undefined, "ltr"),
      );

      expect(result.current.buttons.farLeft.disabled).toBe(true);
      expect(result.current.buttons.left.disabled).toBe(true);
      expect(result.current.buttons.right.disabled).toBe(true);
      expect(result.current.buttons.farRight.disabled).toBe(true);
    });
  });

  describe("when direction is RTL", () => {
    it("maps navigation to right-to-left order", async () => {
      setupMock({
        canNavigateFirst: true,
        canNavigatePrev: true,
        canNavigateNext: true,
        canNavigateLast: true,
      });

      const { result } = await renderHook(() =>
        useComicReaderToolbar(undefined, "rtl"),
      );

      expect(result.current.buttons.farLeft).toEqual({
        label: "Last page (shift + ←)",
        disabled: false,
        onClick: navigateLastSpy,
      });
      expect(result.current.buttons.left).toEqual({
        label: "Next page (←)",
        disabled: false,
        onClick: navigateNextSpy,
      });
      expect(result.current.buttons.right).toEqual({
        label: "Previous page (→)",
        disabled: false,
        onClick: navigatePrevSpy,
      });
      expect(result.current.buttons.farRight).toEqual({
        label: "First page (shift + →)",
        disabled: false,
        onClick: navigateFirstSpy,
      });
    });

    it("disables buttons when navigation is not available", async () => {
      setupMock();

      const { result } = await renderHook(() =>
        useComicReaderToolbar(undefined, "rtl"),
      );

      expect(result.current.buttons.farLeft.disabled).toBe(true);
      expect(result.current.buttons.left.disabled).toBe(true);
      expect(result.current.buttons.right.disabled).toBe(true);
      expect(result.current.buttons.farRight.disabled).toBe(true);
    });
  });

  it("passes through currentSlideNumber and slidesLength", async () => {
    setupMock({ currentSlideNumber: 3, slidesLength: 10 });

    const { result } = await renderHook(() =>
      useComicReaderToolbar(undefined, "ltr"),
    );

    expect(result.current.currentSlideNumber).toBe(3);
    expect(result.current.slidesLength).toBe(10);
  });

  it("returns null for currentSlideNumber and slidesLength when carousel is not ready", async () => {
    setupMock();

    const { result } = await renderHook(() =>
      useComicReaderToolbar(undefined, "ltr"),
    );

    expect(result.current.currentSlideNumber).toBeNull();
    expect(result.current.slidesLength).toBeNull();
  });
});
