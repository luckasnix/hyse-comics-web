import Box from "@mui/material/Box";
import type {
  CSSProperties as SxCSSProperties,
  SxProps,
  Theme,
} from "@mui/material/styles";
import type { EmblaViewportRefType } from "embla-carousel-react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";

import { comicReaderToolbarHeight } from "#/constants/comics";
import { fallbackReadingAxis } from "#/constants/users";
import { useComic } from "#/contexts/comic";
import { useUser } from "#/contexts/user";
import type { ComicDirection, PageBackgroundTexture } from "#/types/comics";
import type { ReadingAxis } from "#/types/users";

export type ComicReaderViewportProps = Readonly<{
  carouselRef: EmblaViewportRefType;
}>;

const containerStyle: SxProps<Theme> = {
  overflow: "hidden",
  backgroundColor: "background.default",
};

const getSlideContainerStyle = (
  readingAxis: ReadingAxis,
  comicDirection: ComicDirection,
): SxProps<Theme> => {
  let flexDirection: SxCSSProperties["flexDirection"] = "column";
  const touchAction: SxCSSProperties["touchAction"] =
    readingAxis === "horizontal" ? "pan-y pinch-zoom" : "pan-x pinch-zoom";

  if (readingAxis === "horizontal") {
    flexDirection = comicDirection === "western" ? "row" : "row-reverse";
  }

  return {
    height: `calc(100dvh - ${comicReaderToolbarHeight}px)`,
    touchAction,
    display: "flex",
    flexDirection,
    cursor: "grab",
    "&:active": {
      cursor: "grabbing",
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

const getImageStyle = (width: number, height: number): CSSProperties => ({
  width: "auto",
  height: "auto",
  maxWidth: "100%",
  maxHeight: "100%",
  aspectRatio: width / height,
  boxSizing: "border-box",
  padding: "clamp(16px, 4vw, 40px)",
});

export const ComicReaderViewport = ({
  carouselRef,
}: ComicReaderViewportProps) => {
  const { t } = useTranslation();

  const { user } = useUser();

  const { comic, pages } = useComic();

  return (
    <Box ref={carouselRef} sx={containerStyle}>
      <Box
        sx={getSlideContainerStyle(
          user?.preferences.readingAxis ?? fallbackReadingAxis,
          comic.direction,
        )}
      >
        {pages.map((page, index) => (
          <Box key={page.id} sx={getPageStyle(page.backgroundTexture)}>
            <img
              src={page.imageUrl}
              alt={t("reader.pageImageAlt", {
                comicTitle: comic.title,
                pageNumber: index + 1,
                pageCount: pages.length,
              })}
              style={getImageStyle(page.imageWidth, page.imageHeight)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
