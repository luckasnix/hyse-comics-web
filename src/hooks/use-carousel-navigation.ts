import type { EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";

export const useCarouselNavigation = (
	carouselApi: EmblaCarouselType | undefined,
) => {
	const [canNavigatePrev, setCanNavigatePrev] = useState(false);
	const [canNavigateNext, setCanNavigateNext] = useState(false);

	const navigatePrev = useCallback(() => {
		carouselApi?.scrollPrev();
	}, [carouselApi]);

	const navigateNext = useCallback(() => {
		carouselApi?.scrollNext();
	}, [carouselApi]);

	const onSelect = useCallback((carouselApi: EmblaCarouselType) => {
		setCanNavigatePrev(carouselApi.canScrollPrev());
		setCanNavigateNext(carouselApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!carouselApi) return;
		onSelect(carouselApi);
		carouselApi.on("reInit", onSelect).on("select", onSelect);
	}, [carouselApi, onSelect]);

	return {
		canNavigatePrev,
		canNavigateNext,
		navigatePrev,
		navigateNext,
	};
};
