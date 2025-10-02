import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import { useParams } from "@tanstack/react-router";
import { useFullscreen } from "ahooks";
import useEmblaCarousel from "embla-carousel-react";
import { useMemo, useRef } from "react";

import { ComicReaderController } from "~/components/comic-reader-controller";
import { ComicReaderViewport } from "~/components/comic-reader-viewport";
import { comicPanelsMock } from "~/mocks/comics";

const containerStyle: SxProps<Theme> = {
  height: "100dvh",
};

export const ComicReaderSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { comicId } = useParams({ strict: false });

  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y" });

  const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen }] =
    useFullscreen(containerRef);

  const comicPanels = useMemo(
    () =>
      comicPanelsMock.filter((comicPanel) => comicPanel.comicId === comicId),
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
      />
    </Stack>
  );
};
