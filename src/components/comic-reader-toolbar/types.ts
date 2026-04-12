import type { EmblaCarouselType } from "embla-carousel";

export type ComicReaderToolbarProps = Readonly<{
  carouselApi: EmblaCarouselType | undefined;
  isFullscreen: boolean;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  toggleFullscreen: () => void;
  openDrawer: () => void;
  toggleDrawer: () => void;
}>;
