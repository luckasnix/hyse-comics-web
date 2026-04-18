import type { EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";

export const useCarouselNavigation = (
  carouselApi: EmblaCarouselType | undefined,
) => {
  const [currentSlideNumber, setCurrentSlideNumber] = useState<number | null>(
    null,
  );
  const [slidesLength, setSlidesLength] = useState<number | null>(null);
  const [canNavigateFirst, setCanNavigateFirst] = useState<boolean>(false);
  const [canNavigatePrev, setCanNavigatePrev] = useState<boolean>(false);
  const [canNavigateNext, setCanNavigateNext] = useState<boolean>(false);
  const [canNavigateLast, setCanNavigateLast] = useState<boolean>(false);

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
    const length = carouselApi.scrollSnapList().length;
    setCurrentSlideNumber(currentIndex + 1);
    setSlidesLength(length);
    setCanNavigateFirst(currentIndex > 0);
    setCanNavigatePrev(carouselApi.canScrollPrev());
    setCanNavigateNext(carouselApi.canScrollNext());
    setCanNavigateLast(currentIndex < length - 1);
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    onSelect(carouselApi);
    carouselApi.on("reInit", onSelect).on("select", onSelect);
  }, [carouselApi, onSelect]);

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
