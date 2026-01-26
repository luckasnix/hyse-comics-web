import Box from "@mui/material/Box";
import type {
  CSSProperties as SxCSSProperties,
  SxProps,
  Theme,
} from "@mui/material/styles";
import type { EmblaViewportRefType } from "embla-carousel-react";
import type { CSSProperties } from "react";

import { comicReaderToolbarHeight } from "#/constants/comics";
import { useComic } from "#/contexts/comic-context";
import { useUser } from "#/contexts/user-context";
import type { ComicDirection, PageBackgroundTexture } from "#/types/comics";
import type { ReadingAxis } from "#/types/users";

const containerStyle: SxProps<Theme> = {
  overflow: "hidden",
  backgroundColor: "background.default",
};

const getSlideContainerStyle = (
  readingAxis: ReadingAxis,
  comicDirection: ComicDirection,
): SxProps<Theme> => {
  let flexDirection: SxCSSProperties["flexDirection"] = "column";

  if (readingAxis === "horizontal") {
    flexDirection = comicDirection === "western" ? "row" : "row-reverse";
  }

  return {
    height: `calc(100dvh - ${comicReaderToolbarHeight}px)`,
    touchAction: "pan-x pinch-zoom",
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
  padding: "40px",
});

export type ComicReaderViewportProps = Readonly<{
  carouselRef: EmblaViewportRefType;
}>;

export const ComicReaderViewport = ({
  carouselRef,
}: ComicReaderViewportProps) => {
  const { user } = useUser();

  const { comic, pages } = useComic();

  return (
    <Box ref={carouselRef} sx={containerStyle}>
      <Box
        sx={getSlideContainerStyle(
          user.preferences.readingAxis,
          comic.direction,
        )}
      >
        {pages.map((page) => (
          <Box key={page.id} sx={getPageStyle(page.backgroundTexture)}>
            <img
              src={page.imageUrl}
              alt={`${comic.title} page`}
              style={getImageStyle(page.imageWidth, page.imageHeight)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
