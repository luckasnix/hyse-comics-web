import type { EmblaCarouselType } from "embla-carousel";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useCarouselNavigation } from "#/hooks/use-carousel-navigation";
import type { AxisDirectionOptionType } from "#/types/comics";

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

export const useComicReaderToolbar = (
  carouselApi: EmblaCarouselType | undefined,
  direction: AxisDirectionOptionType,
) => {
  const { t } = useTranslation();

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
        label: t("reader.firstPageLtr"),
        disabled: !canNavigateFirst,
        onClick: navigateFirst,
      },
      left: {
        label: t("reader.previousPageLtr"),
        disabled: !canNavigatePrev,
        onClick: navigatePrev,
      },
      right: {
        label: t("reader.nextPageLtr"),
        disabled: !canNavigateNext,
        onClick: navigateNext,
      },
      farRight: {
        label: t("reader.lastPageLtr"),
        disabled: !canNavigateLast,
        onClick: navigateLast,
      },
    };

    const rtl: NavigationConfig = {
      farLeft: {
        label: t("reader.firstPageRtl"),
        disabled: !canNavigateLast,
        onClick: navigateLast,
      },
      left: {
        label: t("reader.previousPageRtl"),
        disabled: !canNavigateNext,
        onClick: navigateNext,
      },
      right: {
        label: t("reader.nextPageRtl"),
        disabled: !canNavigatePrev,
        onClick: navigatePrev,
      },
      farRight: {
        label: t("reader.lastPageRtl"),
        disabled: !canNavigateFirst,
        onClick: navigateFirst,
      },
    };

    const buttonsFrom: Record<AxisDirectionOptionType, NavigationConfig> = {
      ltr,
      rtl,
    };

    return buttonsFrom[direction];
  }, [
    t,
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
