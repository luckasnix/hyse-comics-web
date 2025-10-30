import type { EmblaCarouselType } from "embla-carousel";
import { useMemo } from "react";

import { useCarouselNavigation } from "~/hooks/use-carousel-navigation";

export type NavigationDirection = "ltr" | "rtl";

export type NavigationButtonPosition =
  | "farLeft"
  | "left"
  | "right"
  | "farRight";

export type NavigationButtonConfig = {
  label: string;
  disabled: boolean;
  onClick: () => void;
};

export type NavigationConfig = Record<
  NavigationButtonPosition,
  NavigationButtonConfig
>;

export const useCarouselDirectionalNavigation = (
  carouselApi: EmblaCarouselType | undefined,
  direction: NavigationDirection,
) => {
  const {
    canNavigateFirst,
    canNavigatePrev,
    canNavigateNext,
    canNavigateLast,
    navigateFirst,
    navigatePrev,
    navigateNext,
    navigateLast,
    ...rest
  } = useCarouselNavigation(carouselApi);

  const buttons = useMemo(() => {
    const ltr: NavigationConfig = {
      farLeft: {
        label: "First page (shift + ←)",
        disabled: !canNavigateFirst,
        onClick: navigateFirst,
      },
      left: {
        label: "Previous page (←)",
        disabled: !canNavigatePrev,
        onClick: navigatePrev,
      },
      right: {
        label: "Next page (→)",
        disabled: !canNavigateNext,
        onClick: navigateNext,
      },
      farRight: {
        label: "Last page (shift + →)",
        disabled: !canNavigateLast,
        onClick: navigateLast,
      },
    };

    const rtl: NavigationConfig = {
      farLeft: {
        label: "Last page (shift + ←)",
        disabled: !canNavigateLast,
        onClick: navigateLast,
      },
      left: {
        label: "Next page (←)",
        disabled: !canNavigateNext,
        onClick: navigateNext,
      },
      right: {
        label: "Previous page (→)",
        disabled: !canNavigatePrev,
        onClick: navigatePrev,
      },
      farRight: {
        label: "First page (shift + →)",
        disabled: !canNavigateFirst,
        onClick: navigateFirst,
      },
    };

    const buttonsFrom: Record<NavigationDirection, NavigationConfig> = {
      ltr,
      rtl,
    };

    return buttonsFrom[direction];
  }, [
    direction,
    canNavigateFirst,
    canNavigatePrev,
    canNavigateNext,
    canNavigateLast,
    navigateFirst,
    navigatePrev,
    navigateNext,
    navigateLast,
  ]);

  return {
    buttons,
    ...rest,
  };
};
