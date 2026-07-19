import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import { useBoolean, useFullscreen } from "ahooks";
import useEmblaCarousel from "embla-carousel-react";
import { useRef } from "react";

import { ComicReaderDrawer } from "#/components/comic-reader-drawer";
import { ComicReaderToolbar } from "#/components/comic-reader-toolbar";
import { ComicReaderViewport } from "#/components/comic-reader-viewport";
import { carouselDirectionFrom } from "#/constants/comics";
import { carouselAxisFrom, fallbackReadingAxis } from "#/constants/users";
import { useComic } from "#/contexts/comic";
import { useUser } from "#/contexts/user";
import { useScreenOrientation } from "#/hooks/use-screen-orientation";

const containerStyle: SxProps<Theme> = {
  height: "100dvh",
};

export const ComicReaderSection = () => {
  const { user } = useUser();

  const { comic } = useComic();

  const containerRef = useRef<HTMLElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: carouselAxisFrom[
      user?.preferences.readingAxis ?? fallbackReadingAxis
    ],
    direction: carouselDirectionFrom[comic.direction],
  });

  const [isZoomEnabled, { toggle: toggleZoom }] = useBoolean(false);

  const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen }] =
    useFullscreen(containerRef);

  useScreenOrientation(comic.orientation, isFullscreen);

  const [
    isDrawerOpen,
    { setTrue: openDrawer, setFalse: closeDrawer, toggle: toggleDrawer },
  ] = useBoolean(false);

  return (
    <Stack component="section" ref={containerRef} sx={containerStyle}>
      <ComicReaderViewport
        carouselRef={emblaRef}
        isZoomEnabled={isZoomEnabled}
      />
      <ComicReaderToolbar
        carouselApi={emblaApi}
        isZoomEnabled={isZoomEnabled}
        isFullscreen={isFullscreen}
        toggleZoom={toggleZoom}
        enterFullscreen={enterFullscreen}
        exitFullscreen={exitFullscreen}
        toggleFullscreen={toggleFullscreen}
        openDrawer={openDrawer}
        toggleDrawer={toggleDrawer}
      />
      <ComicReaderDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </Stack>
  );
};
