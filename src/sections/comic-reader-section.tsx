import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import { useBoolean, useFullscreen } from "ahooks";
import useEmblaCarousel from "embla-carousel-react";
import { useRef } from "react";

import { ComicReaderDrawer } from "~/components/comic-reader-drawer";
import { ComicReaderToolbar } from "~/components/comic-reader-toolbar";
import { ComicReaderViewport } from "~/components/comic-reader-viewport";
import { carouselDirectionFrom } from "~/constants/comics";
import { carouselAxisFrom } from "~/constants/users";
import { userMock } from "~/mocks/users";
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

  const [emblaRef, emblaApi] = useEmblaCarousel({
    // TODO: Use real user settings
    axis: carouselAxisFrom[userMock.reading.axis],
    direction: carouselDirectionFrom[comic.direction],
  });

  const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen }] =
    useFullscreen(containerRef);

  const [isDrawerOpen, { setFalse: closeDrawer, toggle: toggleDrawer }] =
    useBoolean(false);

  return (
    <Stack component="section" ref={containerRef} sx={containerStyle}>
      <ComicReaderViewport
        user={userMock}
        comic={comic}
        comicPages={comicPages}
        carouselRef={emblaRef}
      />
      <ComicReaderToolbar
        comic={comic}
        carouselApi={emblaApi}
        isFullscreen={isFullscreen}
        enterFullscreen={enterFullscreen}
        exitFullscreen={exitFullscreen}
        toggleFullscreen={toggleFullscreen}
        toggleDrawer={toggleDrawer}
      />
      <ComicReaderDrawer
        comic={comic}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
    </Stack>
  );
};
