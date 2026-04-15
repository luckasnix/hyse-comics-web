import type { EmblaCarouselType } from "embla-carousel";

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

export type ComicReaderToolbarProps = Readonly<{
  carouselApi: EmblaCarouselType | undefined;
  isFullscreen: boolean;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  toggleFullscreen: () => void;
  openDrawer: () => void;
  toggleDrawer: () => void;
}>;
