import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import { useBoolean, useFullscreen } from "ahooks";
import useEmblaCarousel from "embla-carousel-react";
import { useRef } from "react";

import { ComicReaderDrawer } from "~/components/comic-reader-drawer";
import { ComicReaderToolbar } from "~/components/comic-reader-toolbar";
import { ComicReaderViewport } from "~/components/comic-reader-viewport";
import type { Comic, ComicPage } from "~/types/comics";

const containerStyle: SxProps<Theme> = {
  height: "100dvh",
};

export type ComicReaderSectionProps = Readonly<{
  comic: Comic;
  comicPages: Array<ComicPage>;
}>;

export const ComicReaderSection = ({
  comic,
  comicPages,
}: ComicReaderSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);

  // TODO: Adapt reading to user's "axis" settings
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
  });

  const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen }] =
    useFullscreen(containerRef);

  const [isDrawerOpen, { setFalse: closeDrawer, toggle: toggleDrawer }] =
    useBoolean(false);

  return (
    <Stack component="section" ref={containerRef} sx={containerStyle}>
      <ComicReaderViewport viewportRef={emblaRef} comicPages={comicPages} />
      <ComicReaderToolbar
        controllerApi={emblaApi}
        isFullscreen={isFullscreen}
        enterFullscreen={enterFullscreen}
        exitFullscreen={exitFullscreen}
        toggleFullscreen={toggleFullscreen}
        toggleDrawer={toggleDrawer}
      />
      <ComicReaderDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        comic={comic}
      />
    </Stack>
  );
};
