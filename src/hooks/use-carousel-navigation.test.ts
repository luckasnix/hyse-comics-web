// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import type { EmblaCarouselType } from "embla-carousel";
import { describe, expect, it, vi } from "vitest";

import { useCarouselNavigation } from "./use-carousel-navigation";

type EmblaEventCallback = (api: EmblaCarouselType) => void;

const createCarouselApi = ({
  currentIndex = 0,
  totalSlides = 5,
  canScrollPrev = false,
  canScrollNext = true,
} = {}) => {
  const listeners: Record<string, EmblaEventCallback[]> = {};

  const selectedScrollSnapMock = vi.fn().mockReturnValue(currentIndex);
  const scrollSnapListMock = vi
    .fn()
    .mockReturnValue(new Array(totalSlides).fill(0));
  const canScrollPrevMock = vi.fn().mockReturnValue(canScrollPrev);
  const canScrollNextMock = vi.fn().mockReturnValue(canScrollNext);
  const scrollToMock = vi.fn();
  const scrollPrevMock = vi.fn();
  const scrollNextMock = vi.fn();

  const api = {
    selectedScrollSnap: selectedScrollSnapMock,
    scrollSnapList: scrollSnapListMock,
    canScrollPrev: canScrollPrevMock,
    canScrollNext: canScrollNextMock,
    scrollTo: scrollToMock,
    scrollPrev: scrollPrevMock,
    scrollNext: scrollNextMock,
    on: vi
      .fn()
      .mockImplementation((event: string, callback: EmblaEventCallback) => {
        listeners[event] = listeners[event] ?? [];
        listeners[event].push(callback);
        return api;
      }),
  } as unknown as EmblaCarouselType;

  const emit = (event: string) => {
    for (const callback of listeners[event] ?? []) {
      callback(api);
    }
  };

  return {
    api,
    emit,
    mocks: {
      selectedScrollSnap: selectedScrollSnapMock,
      scrollSnapList: scrollSnapListMock,
      canScrollPrev: canScrollPrevMock,
      canScrollNext: canScrollNextMock,
      scrollTo: scrollToMock,
      scrollPrev: scrollPrevMock,
      scrollNext: scrollNextMock,
    },
  };
};

describe("useCarouselNavigation()", () => {
  describe("when carouselApi is undefined", () => {
    it("returns null for currentSlideNumber and slidesLength", () => {
      const { result } = renderHook(() => useCarouselNavigation(undefined));

      expect(result.current.currentSlideNumber).toBeNull();
      expect(result.current.slidesLength).toBeNull();
    });

    it("returns false for all navigation flags", () => {
      const { result } = renderHook(() => useCarouselNavigation(undefined));

      expect(result.current.canNavigateFirst).toBe(false);
      expect(result.current.canNavigatePrev).toBe(false);
      expect(result.current.canNavigateNext).toBe(false);
      expect(result.current.canNavigateLast).toBe(false);
    });

    it("navigation functions do not throw when called without an api", () => {
      const { result } = renderHook(() => useCarouselNavigation(undefined));

      expect(() => result.current.navigateFirst()).not.toThrow();
      expect(() => result.current.navigatePrev()).not.toThrow();
      expect(() => result.current.navigateNext()).not.toThrow();
      expect(() => result.current.navigateLast()).not.toThrow();
    });
  });

  describe("when carouselApi is provided", () => {
    it("reads slide info from the carousel on mount", () => {
      const { api } = createCarouselApi({ currentIndex: 2, totalSlides: 10 });

      const { result } = renderHook(() => useCarouselNavigation(api));

      expect(result.current.currentSlideNumber).toBe(3);
      expect(result.current.slidesLength).toBe(10);
    });

    it("registers reInit and select event listeners", () => {
      const { api } = createCarouselApi();

      renderHook(() => useCarouselNavigation(api));

      expect(api.on).toHaveBeenCalledWith("reInit", expect.any(Function));
      expect(api.on).toHaveBeenCalledWith("select", expect.any(Function));
    });

    describe("canNavigateFirst", () => {
      it("is false when at the first slide", () => {
        const { api } = createCarouselApi({ currentIndex: 0, totalSlides: 5 });

        const { result } = renderHook(() => useCarouselNavigation(api));

        expect(result.current.canNavigateFirst).toBe(false);
      });

      it("is true when not at the first slide", () => {
        const { api } = createCarouselApi({ currentIndex: 1, totalSlides: 5 });

        const { result } = renderHook(() => useCarouselNavigation(api));

        expect(result.current.canNavigateFirst).toBe(true);
      });
    });

    describe("canNavigateLast", () => {
      it("is true when not at the last slide", () => {
        const { api } = createCarouselApi({ currentIndex: 3, totalSlides: 5 });

        const { result } = renderHook(() => useCarouselNavigation(api));

        expect(result.current.canNavigateLast).toBe(true);
      });

      it("is false when at the last slide", () => {
        const { api } = createCarouselApi({ currentIndex: 4, totalSlides: 5 });

        const { result } = renderHook(() => useCarouselNavigation(api));

        expect(result.current.canNavigateLast).toBe(false);
      });
    });

    describe("canNavigatePrev", () => {
      it("reflects api.canScrollPrev()", () => {
        const { api } = createCarouselApi({ canScrollPrev: true });

        const { result } = renderHook(() => useCarouselNavigation(api));

        expect(result.current.canNavigatePrev).toBe(true);
      });

      it("is false when api.canScrollPrev() returns false", () => {
        const { api } = createCarouselApi({ canScrollPrev: false });

        const { result } = renderHook(() => useCarouselNavigation(api));

        expect(result.current.canNavigatePrev).toBe(false);
      });
    });

    describe("canNavigateNext", () => {
      it("reflects api.canScrollNext()", () => {
        const { api } = createCarouselApi({ canScrollNext: true });

        const { result } = renderHook(() => useCarouselNavigation(api));

        expect(result.current.canNavigateNext).toBe(true);
      });

      it("is false when api.canScrollNext() returns false", () => {
        const { api } = createCarouselApi({ canScrollNext: false });

        const { result } = renderHook(() => useCarouselNavigation(api));

        expect(result.current.canNavigateNext).toBe(false);
      });
    });

    describe("on select event", () => {
      it("updates currentSlideNumber and slidesLength", () => {
        const { api, emit, mocks } = createCarouselApi({
          currentIndex: 0,
          totalSlides: 3,
        });

        const { result } = renderHook(() => useCarouselNavigation(api));

        mocks.selectedScrollSnap.mockReturnValue(2);
        mocks.scrollSnapList.mockReturnValue(new Array(5).fill(0));

        act(() => emit("select"));

        expect(result.current.currentSlideNumber).toBe(3);
        expect(result.current.slidesLength).toBe(5);
      });

      it("updates navigation flags", () => {
        const { api, emit, mocks } = createCarouselApi({
          currentIndex: 0,
          totalSlides: 3,
          canScrollPrev: false,
          canScrollNext: true,
        });

        const { result } = renderHook(() => useCarouselNavigation(api));

        mocks.selectedScrollSnap.mockReturnValue(2);
        mocks.canScrollPrev.mockReturnValue(true);
        mocks.canScrollNext.mockReturnValue(false);

        act(() => emit("select"));

        expect(result.current.canNavigateFirst).toBe(true);
        expect(result.current.canNavigatePrev).toBe(true);
        expect(result.current.canNavigateNext).toBe(false);
        expect(result.current.canNavigateLast).toBe(false);
      });
    });

    describe("on reInit event", () => {
      it("updates state from the carousel", () => {
        const { api, emit, mocks } = createCarouselApi({
          currentIndex: 0,
          totalSlides: 3,
        });

        const { result } = renderHook(() => useCarouselNavigation(api));

        mocks.selectedScrollSnap.mockReturnValue(1);
        mocks.scrollSnapList.mockReturnValue(new Array(8).fill(0));
        mocks.canScrollPrev.mockReturnValue(true);
        mocks.canScrollNext.mockReturnValue(true);

        act(() => emit("reInit"));

        expect(result.current.currentSlideNumber).toBe(2);
        expect(result.current.slidesLength).toBe(8);
        expect(result.current.canNavigateFirst).toBe(true);
        expect(result.current.canNavigatePrev).toBe(true);
        expect(result.current.canNavigateNext).toBe(true);
        expect(result.current.canNavigateLast).toBe(true);
      });
    });

    describe("navigateFirst", () => {
      it("calls scrollTo(0)", () => {
        const { api, mocks } = createCarouselApi();

        const { result } = renderHook(() => useCarouselNavigation(api));
        result.current.navigateFirst();

        expect(mocks.scrollTo).toHaveBeenCalledWith(0);
      });
    });

    describe("navigatePrev", () => {
      it("calls scrollPrev()", () => {
        const { api, mocks } = createCarouselApi();

        const { result } = renderHook(() => useCarouselNavigation(api));
        result.current.navigatePrev();

        expect(mocks.scrollPrev).toHaveBeenCalled();
      });
    });

    describe("navigateNext", () => {
      it("calls scrollNext()", () => {
        const { api, mocks } = createCarouselApi();

        const { result } = renderHook(() => useCarouselNavigation(api));
        result.current.navigateNext();

        expect(mocks.scrollNext).toHaveBeenCalled();
      });
    });

    describe("navigateLast", () => {
      it("calls scrollTo with the last index", () => {
        const { api, mocks } = createCarouselApi({ totalSlides: 5 });

        const { result } = renderHook(() => useCarouselNavigation(api));
        result.current.navigateLast();

        expect(mocks.scrollTo).toHaveBeenCalledWith(4);
      });
    });
  });
});
