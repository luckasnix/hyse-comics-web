import type { EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";

export const useCarouselNavigation = (
  carouselApi: EmblaCarouselType | undefined,
) => {
  const [canNavigateFirst, setCanNavigateFirst] = useState(false);
  const [canNavigatePrev, setCanNavigatePrev] = useState(false);
  const [canNavigateNext, setCanNavigateNext] = useState(false);
  const [canNavigateLast, setCanNavigateLast] = useState(false);

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
    carouselApi?.scrollTo(lastIndex);
  }, [carouselApi]);

  const onSelect = useCallback((carouselApi: EmblaCarouselType) => {
    const currentIndex = carouselApi.selectedScrollSnap();
    const lastIndex = carouselApi.scrollSnapList().length - 1;
    setCanNavigateFirst(currentIndex > 0);
    setCanNavigatePrev(carouselApi.canScrollPrev());
    setCanNavigateNext(carouselApi.canScrollNext());
    setCanNavigateLast(currentIndex < lastIndex);
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    onSelect(carouselApi);
    carouselApi.on("reInit", onSelect).on("select", onSelect);
  }, [carouselApi, onSelect]);

  return {
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
