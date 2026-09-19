import type { EmblaCarouselType } from "embla-carousel";
import { useCallback, useMemo, useSyncExternalStore } from "react";

type CarouselSnapshot = Readonly<{
  currentIndex: number | null;
  slidesLength: number | null;
  canNavigatePrev: boolean;
  canNavigateNext: boolean;
}>;

const EMPTY_CAROUSEL_SNAPSHOT: CarouselSnapshot = {
  currentIndex: null,
  slidesLength: null,
  canNavigatePrev: false,
  canNavigateNext: false,
};

const getServerSnapshot = () => EMPTY_CAROUSEL_SNAPSHOT;

const createGetSnapshot = (carouselApi: EmblaCarouselType | undefined) => {
  let snapshot = EMPTY_CAROUSEL_SNAPSHOT;

  return () => {
    if (!carouselApi) return EMPTY_CAROUSEL_SNAPSHOT;

    const currentIndex = carouselApi.selectedScrollSnap();
    const slidesLength = carouselApi.scrollSnapList().length;
    const canNavigatePrev = carouselApi.canScrollPrev();
    const canNavigateNext = carouselApi.canScrollNext();

    // React requires the same snapshot reference while the store is unchanged.
    if (
      snapshot.currentIndex !== currentIndex ||
      snapshot.slidesLength !== slidesLength ||
      snapshot.canNavigatePrev !== canNavigatePrev ||
      snapshot.canNavigateNext !== canNavigateNext
    ) {
      snapshot = {
        currentIndex,
        slidesLength,
        canNavigatePrev,
        canNavigateNext,
      };
    }

    return snapshot;
  };
};

export const useCarouselNavigation = (
  carouselApi: EmblaCarouselType | undefined,
) => {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!carouselApi) return () => {};

      carouselApi.on("reInit", onStoreChange).on("select", onStoreChange);

      return () => {
        carouselApi.off("reInit", onStoreChange).off("select", onStoreChange);
      };
    },
    [carouselApi],
  );

  const getSnapshot = useMemo(
    () => createGetSnapshot(carouselApi),
    [carouselApi],
  );

  const { currentIndex, slidesLength, canNavigatePrev, canNavigateNext } =
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const currentSlideNumber = currentIndex === null ? null : currentIndex + 1;
  const canNavigateFirst = currentIndex !== null && currentIndex > 0;
  const canNavigateLast =
    currentIndex !== null &&
    slidesLength !== null &&
    currentIndex < slidesLength - 1;

  const navigateFirst = useCallback(() => {
    carouselApi?.scrollTo(0);
  }, [carouselApi]);

  const navigatePrev = useCallback(() => {
    carouselApi?.scrollPrev();
  }, [carouselApi]);

  const navigateNext = useCallback(() => {
    carouselApi?.scrollNext();
  }, [carouselApi]);

  const navigateLast = useCallback(() => {
    if (!carouselApi) return;
    const lastIndex = carouselApi.scrollSnapList().length - 1;
    carouselApi.scrollTo(lastIndex);
  }, [carouselApi]);

  return {
    currentSlideNumber,
    slidesLength,
    canNavigateFirst,
    canNavigatePrev,
    canNavigateNext,
    canNavigateLast,
    navigateFirst,
    navigatePrev,
    navigateNext,
    navigateLast,
  };
};
