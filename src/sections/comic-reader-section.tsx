"use client";
import Stack from "@mui/material/Stack";
import useEmblaCarousel from "embla-carousel-react";
import type { SxProps, Theme } from "@mui/material/styles";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { ComicReaderController } from "~/components/comic-reader-controller";
import { ComicReaderViewport } from "~/components/comic-reader-viewport";
import { useCarouselNavigation } from "~/hooks/use-carousel-navigation";
import { comicPanelsMock } from "~/mocks/comics";

const containerStyle: SxProps<Theme> = {
  height: "100dvh",
};

export const ComicReaderSection = () => {
  const searchParams = useSearchParams();

  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y" });

  const comicId = searchParams.get("id");

  const { canNavigatePrev, canNavigateNext, navigatePrev, navigateNext } =
    useCarouselNavigation(emblaApi);

  const comicPanels = useMemo(
    () =>
      comicPanelsMock.filter((comicPanel) => comicPanel.comicId === comicId),
    [comicId]
  );

  return (
    <Stack component="section" sx={containerStyle}>
      <ComicReaderViewport viewportRef={emblaRef} comicPanels={comicPanels} />
      <ComicReaderController
        isPrevButtonDisabled={!canNavigatePrev}
        isNextButtonDisabled={!canNavigateNext}
        onPrevButtonClick={navigatePrev}
        onNextButtonClick={navigateNext}
      />
    </Stack>
  );
};
