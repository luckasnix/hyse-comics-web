import Box from "@mui/material/Box";
import type {
  CSSProperties as SxCSSProperties,
  SxProps,
  Theme,
} from "@mui/material/styles";
import type { EmblaViewportRefType } from "embla-carousel-react";
import { type CSSProperties, type PointerEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  comicReaderToolbarHeight,
  comicReaderZoomScale,
} from "#/constants/comics";
import { fallbackReadingAxis } from "#/constants/users";
import { useComic } from "#/contexts/comic";
import { useUser } from "#/contexts/user";
import type { ComicDirection, PageBackgroundTexture } from "#/types/comics";
import type { ReadingAxis } from "#/types/users";

export type ComicReaderViewportProps = Readonly<{
  carouselRef: EmblaViewportRefType;
  isZoomEnabled: boolean;
}>;

const containerStyle: SxProps<Theme> = {
  overflow: "hidden",
  backgroundColor: "background.default",
};

const getSlideContainerStyle = (
  readingAxis: ReadingAxis,
  comicDirection: ComicDirection,
  isZoomEnabled: boolean,
): SxProps<Theme> => {
  let flexDirection: SxCSSProperties["flexDirection"] = "column";
  const touchAction: SxCSSProperties["touchAction"] =
    readingAxis === "horizontal" ? "pan-y pinch-zoom" : "pan-x pinch-zoom";
  const cursor: SxCSSProperties["cursor"] = isZoomEnabled ? "zoom-in" : "grab";

  if (readingAxis === "horizontal") {
    flexDirection = comicDirection === "western" ? "row" : "row-reverse";
  }

  return {
    height: `calc(100dvh - ${comicReaderToolbarHeight}px)`,
    touchAction,
    display: "flex",
    flexDirection,
    cursor,
    "&:active": {
      cursor: isZoomEnabled ? cursor : "grabbing",
    },
  };
};

const getPageStyle = (
  backgroundTexture: PageBackgroundTexture | null,
): SxProps<Theme> => ({
  minHeight: 0,
  flex: "0 0 100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ...(backgroundTexture && {
    backgroundImage: `url(/textures/${backgroundTexture}.webp)`,
    backgroundRepeat: "repeat",
    backgroundSize: "auto",
  }),
});

const getImageStyle = (
  width: number,
  height: number,
  isZoomed: boolean,
  zoomOrigin: CSSProperties["transformOrigin"],
): CSSProperties => ({
  width: "auto",
  height: "auto",
  maxWidth: "100%",
  maxHeight: "100%",
  aspectRatio: width / height,
  boxSizing: "border-box",
  padding: "clamp(16px, 4vw, 40px)",
  transition: "transform 120ms ease-out",
  ...(isZoomed && {
    transform: `scale(${comicReaderZoomScale})`,
    transformOrigin: zoomOrigin,
    willChange: "transform",
  }),
});

export const ComicReaderViewport = ({
  carouselRef,
  isZoomEnabled,
}: ComicReaderViewportProps) => {
  const { t } = useTranslation();

  const { user } = useUser();

  const { comic, pages } = useComic();

  const [isPointerInsideViewport, setIsPointerInsideViewport] = useState(false);

  const [zoomedPageId, setZoomedPageId] = useState<string | null>(null);

  const [zoomOrigin, setZoomOrigin] =
    useState<CSSProperties["transformOrigin"]>("50% 50%");

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLImageElement)) {
      return;
    }

    const image = event.target;
    const rect = image.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) {
      return;
    }

    setZoomedPageId(image.dataset.pageId ?? null);
    setZoomOrigin(
      `${((event.clientX - rect.left) / rect.width) * 100}% ${
        ((event.clientY - rect.top) / rect.height) * 100
      }%`,
    );
  };

  const handlePointerLeave = () => {
    setIsPointerInsideViewport(false);
    setZoomedPageId(null);
  };

  return (
    <Box
      ref={carouselRef}
      sx={containerStyle}
      data-testid="comic-reader-viewport"
      onPointerEnter={() => setIsPointerInsideViewport(true)}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <Box
        sx={getSlideContainerStyle(
          user?.preferences.readingAxis ?? fallbackReadingAxis,
          comic.direction,
          isZoomEnabled,
        )}
      >
        {pages.map((page, index) => (
          <Box key={page.id} sx={getPageStyle(page.backgroundTexture)}>
            <img
              data-page-id={page.id}
              src={page.imageUrl}
              alt={t("reader.pageImageAlt", {
                comicTitle: comic.title,
                pageNumber: index + 1,
                pageCount: pages.length,
              })}
              style={getImageStyle(
                page.imageWidth,
                page.imageHeight,
                isZoomEnabled &&
                  isPointerInsideViewport &&
                  zoomedPageId === page.id,
                zoomOrigin,
              )}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
