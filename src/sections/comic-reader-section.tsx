import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import { useParams } from "@tanstack/react-router";
import { useBoolean, useFullscreen } from "ahooks";
import useEmblaCarousel from "embla-carousel-react";
import { useMemo, useRef } from "react";

import { ComicReaderController } from "~/components/comic-reader-controller";
import { ComicReaderDrawer } from "~/components/comic-reader-drawer";
import { ComicReaderViewport } from "~/components/comic-reader-viewport";
import { comicPanelsMock, comicsMock } from "~/mocks/comics";

const containerStyle: SxProps<Theme> = {
  height: "100dvh",
};

export const ComicReaderSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { comicId } = useParams({ strict: false });

  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y" });

  const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen }] =
    useFullscreen(containerRef);

  const [isDrawerOpen, { setFalse: closeDrawer, toggle: toggleDrawer }] =
    useBoolean(false);

  const comic = useMemo(
    () => comicsMock.find((curComic) => curComic.id === comicId),
    [comicId],
  );

  const comicPanels = useMemo(
    () =>
      comicPanelsMock.filter(
        (curComicPanel) => curComicPanel.comicId === comicId,
      ),
    [comicId],
  );

  return (
    <Stack component="section" ref={containerRef} sx={containerStyle}>
      <ComicReaderViewport viewportRef={emblaRef} comicPanels={comicPanels} />
      <ComicReaderController
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
