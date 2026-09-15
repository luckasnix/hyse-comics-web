import type { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import { describe, expect, it, vi } from "vitest";
import { renderHook } from "vitest-browser-react/pure";

import { useCarouselNavigation } from "./use-carousel-navigation.ts";

type EmblaEventCallback = (api: EmblaCarouselType) => void;

const createCarouselApi = ({
  currentIndex = 0,
  totalSlides = 5,
  canScrollPrev = false,
  canScrollNext = true,
} = {}) => {
  const listeners: Partial<Record<EmblaEventType, EmblaEventCallback[]>> = {};

  const selectedScrollSnapMock = vi.fn().mockReturnValue(currentIndex);
  const scrollSnapListMock = vi
    .fn()
    .mockReturnValue(new Array(totalSlides).fill(0));
  const canScrollPrevMock = vi.fn().mockReturnValue(canScrollPrev);
  const canScrollNextMock = vi.fn().mockReturnValue(canScrollNext);
  const scrollToMock = vi.fn();
  const scrollPrevMock = vi.fn();
  const scrollNextMock = vi.fn();
  const onMock = vi
    .fn()
    .mockImplementation(
      (event: EmblaEventType, callback: EmblaEventCallback) => {
        listeners[event] = listeners[event] ?? [];
        listeners[event].push(callback);
        return api;
      },
    );
  const offMock = vi
    .fn()
    .mockImplementation(
      (event: EmblaEventType, callback: EmblaEventCallback) => {
        listeners[event] = (listeners[event] ?? []).filter(
          (listener) => listener !== callback,
        );
        return api;
      },
    );

  let api: EmblaCarouselType;
  api = {
    selectedScrollSnap: selectedScrollSnapMock,
    scrollSnapList: scrollSnapListMock,
    canScrollPrev: canScrollPrevMock,
    canScrollNext: canScrollNextMock,
    scrollTo: scrollToMock,
    scrollPrev: scrollPrevMock,
    scrollNext: scrollNextMock,
    on: onMock,
    off: offMock,
  } as unknown as EmblaCarouselType;

  const emit = (event: EmblaEventType) => {
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
      on: onMock,
      off: offMock,
    },
  };
};

describe("useCarouselNavigation()", () => {
  describe("when carouselApi is undefined", () => {
    it("returns null for currentSlideNumber and slidesLength", async () => {
      const { result } = await renderHook(() =>
        useCarouselNavigation(undefined),
      );

      expect(result.current.currentSlideNumber).toBeNull();
      expect(result.current.slidesLength).toBeNull();
    });

    it("returns false for all navigation flags", async () => {
      const { result } = await renderHook(() =>
        useCarouselNavigation(undefined),
      );

      expect(result.current.canNavigateFirst).toBe(false);
      expect(result.current.canNavigatePrev).toBe(false);
      expect(result.current.canNavigateNext).toBe(false);
      expect(result.current.canNavigateLast).toBe(false);
    });

    it("navigation functions do not throw when called without an api", async () => {
      const { result } = await renderHook(() =>
        useCarouselNavigation(undefined),
      );

      expect(() => result.current.navigateFirst()).not.toThrow();
      expect(() => result.current.navigatePrev()).not.toThrow();
      expect(() => result.current.navigateNext()).not.toThrow();
      expect(() => result.current.navigateLast()).not.toThrow();
    });
  });

  describe("when carouselApi is provided", () => {
    it("reads slide info from the carousel on mount", async () => {
      const { api } = createCarouselApi({ currentIndex: 2, totalSlides: 10 });

      const { result } = await renderHook(() => useCarouselNavigation(api));

      expect(result.current.currentSlideNumber).toBe(3);
      expect(result.current.slidesLength).toBe(10);
    });

    it("registers reInit and select event listeners", async () => {
      const { api } = createCarouselApi();

      await renderHook(() => useCarouselNavigation(api));

      expect(api.on).toHaveBeenCalledWith("reInit", expect.any(Function));
      expect(api.on).toHaveBeenCalledWith("select", expect.any(Function));
    });

    it("removes reInit and select event listeners on unmount", async () => {
      const { api, mocks } = createCarouselApi();

      const { unmount } = await renderHook(() => useCarouselNavigation(api));
      const reInitCallback = mocks.on.mock.calls.find(
        ([event]) => event === "reInit",
      )?.[1];
      const selectCallback = mocks.on.mock.calls.find(
        ([event]) => event === "select",
      )?.[1];

      await unmount();

      expect(reInitCallback).toEqual(expect.any(Function));
      expect(selectCallback).toEqual(expect.any(Function));
      expect(mocks.off).toHaveBeenCalledWith("reInit", reInitCallback);
      expect(mocks.off).toHaveBeenCalledWith("select", selectCallback);
    });

    it("removes event listeners from the previous carousel api when it changes", async () => {
      const previousCarousel = createCarouselApi();
      const nextCarousel = createCarouselApi();

      const { rerender } = await renderHook(
        (props) => useCarouselNavigation(props?.api),
        {
          initialProps: { api: previousCarousel.api },
        },
      );
      const reInitCallback = previousCarousel.mocks.on.mock.calls.find(
        ([event]) => event === "reInit",
      )?.[1];
      const selectCallback = previousCarousel.mocks.on.mock.calls.find(
        ([event]) => event === "select",
      )?.[1];

      await rerender({ api: nextCarousel.api });

      expect(previousCarousel.mocks.off).toHaveBeenCalledWith(
        "reInit",
        reInitCallback,
      );
      expect(previousCarousel.mocks.off).toHaveBeenCalledWith(
        "select",
        selectCallback,
      );
      expect(nextCarousel.mocks.on).toHaveBeenCalledWith(
        "reInit",
        expect.any(Function),
      );
      expect(nextCarousel.mocks.on).toHaveBeenCalledWith(
        "select",
        expect.any(Function),
      );
    });

    describe("canNavigateFirst", () => {
      it("is false when at the first slide", async () => {
        const { api } = createCarouselApi({ currentIndex: 0, totalSlides: 5 });

        const { result } = await renderHook(() => useCarouselNavigation(api));

        expect(result.current.canNavigateFirst).toBe(false);
      });

      it("is true when not at the first slide", async () => {
        const { api } = createCarouselApi({ currentIndex: 1, totalSlides: 5 });

        const { result } = await renderHook(() => useCarouselNavigation(api));

        expect(result.current.canNavigateFirst).toBe(true);
      });
    });

    describe("canNavigateLast", () => {
      it("is true when not at the last slide", async () => {
        const { api } = createCarouselApi({ currentIndex: 3, totalSlides: 5 });

        const { result } = await renderHook(() => useCarouselNavigation(api));

        expect(result.current.canNavigateLast).toBe(true);
      });

      it("is false when at the last slide", async () => {
        const { api } = createCarouselApi({ currentIndex: 4, totalSlides: 5 });

        const { result } = await renderHook(() => useCarouselNavigation(api));

        expect(result.current.canNavigateLast).toBe(false);
      });
    });

    describe("canNavigatePrev", () => {
      it("reflects api.canScrollPrev()", async () => {
        const { api } = createCarouselApi({ canScrollPrev: true });

        const { result } = await renderHook(() => useCarouselNavigation(api));

        expect(result.current.canNavigatePrev).toBe(true);
      });

      it("is false when api.canScrollPrev() returns false", async () => {
        const { api } = createCarouselApi({ canScrollPrev: false });

        const { result } = await renderHook(() => useCarouselNavigation(api));

        expect(result.current.canNavigatePrev).toBe(false);
      });
    });

    describe("canNavigateNext", () => {
      it("reflects api.canScrollNext()", async () => {
        const { api } = createCarouselApi({ canScrollNext: true });

        const { result } = await renderHook(() => useCarouselNavigation(api));

        expect(result.current.canNavigateNext).toBe(true);
      });

      it("is false when api.canScrollNext() returns false", async () => {
        const { api } = createCarouselApi({ canScrollNext: false });

        const { result } = await renderHook(() => useCarouselNavigation(api));

        expect(result.current.canNavigateNext).toBe(false);
      });
    });

    describe("on select event", () => {
      it("updates currentSlideNumber and slidesLength", async () => {
        const { api, emit, mocks } = createCarouselApi({
          currentIndex: 0,
          totalSlides: 3,
        });

        const { act, result } = await renderHook(() =>
          useCarouselNavigation(api),
        );

        mocks.selectedScrollSnap.mockReturnValue(2);
        mocks.scrollSnapList.mockReturnValue(new Array(5).fill(0));

        await act(() => emit("select"));

        expect(result.current.currentSlideNumber).toBe(3);
        expect(result.current.slidesLength).toBe(5);
      });

      it("updates navigation flags", async () => {
        const { api, emit, mocks } = createCarouselApi({
          currentIndex: 0,
          totalSlides: 3,
          canScrollPrev: false,
          canScrollNext: true,
        });

        const { act, result } = await renderHook(() =>
          useCarouselNavigation(api),
        );

        mocks.selectedScrollSnap.mockReturnValue(2);
        mocks.canScrollPrev.mockReturnValue(true);
        mocks.canScrollNext.mockReturnValue(false);

        await act(() => emit("select"));

        expect(result.current.canNavigateFirst).toBe(true);
        expect(result.current.canNavigatePrev).toBe(true);
        expect(result.current.canNavigateNext).toBe(false);
        expect(result.current.canNavigateLast).toBe(false);
      });
    });

    describe("on reInit event", () => {
      it("updates state from the carousel", async () => {
        const { api, emit, mocks } = createCarouselApi({
          currentIndex: 0,
          totalSlides: 3,
        });

        const { act, result } = await renderHook(() =>
          useCarouselNavigation(api),
        );

        mocks.selectedScrollSnap.mockReturnValue(1);
        mocks.scrollSnapList.mockReturnValue(new Array(8).fill(0));
        mocks.canScrollPrev.mockReturnValue(true);
        mocks.canScrollNext.mockReturnValue(true);

        await act(() => emit("reInit"));

        expect(result.current.currentSlideNumber).toBe(2);
        expect(result.current.slidesLength).toBe(8);
        expect(result.current.canNavigateFirst).toBe(true);
        expect(result.current.canNavigatePrev).toBe(true);
        expect(result.current.canNavigateNext).toBe(true);
        expect(result.current.canNavigateLast).toBe(true);
      });
    });

    describe("navigateFirst", () => {
      it("calls scrollTo(0)", async () => {
        const { api, mocks } = createCarouselApi();

        const { result } = await renderHook(() => useCarouselNavigation(api));
        result.current.navigateFirst();

        expect(mocks.scrollTo).toHaveBeenCalledWith(0);
      });
    });

    describe("navigatePrev", () => {
      it("calls scrollPrev()", async () => {
        const { api, mocks } = createCarouselApi();

        const { result } = await renderHook(() => useCarouselNavigation(api));
        result.current.navigatePrev();

        expect(mocks.scrollPrev).toHaveBeenCalled();
      });
    });

    describe("navigateNext", () => {
      it("calls scrollNext()", async () => {
        const { api, mocks } = createCarouselApi();

        const { result } = await renderHook(() => useCarouselNavigation(api));
        result.current.navigateNext();

        expect(mocks.scrollNext).toHaveBeenCalled();
      });
    });

    describe("navigateLast", () => {
      it("calls scrollTo with the last index", async () => {
        const { api, mocks } = createCarouselApi({ totalSlides: 5 });

        const { result } = await renderHook(() => useCarouselNavigation(api));
        result.current.navigateLast();

        expect(mocks.scrollTo).toHaveBeenCalledWith(4);
      });
    });
  });
});
