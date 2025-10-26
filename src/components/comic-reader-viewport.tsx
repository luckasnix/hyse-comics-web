import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import type { EmblaViewportRefType } from "embla-carousel-react";
import type { CSSProperties } from "react";

import { comicReaderToolbarHeight } from "~/constants/comics";
import type { Comic, ComicDirection, ComicPage } from "~/types/comics";
import type { User, UserReadingAxis } from "~/types/users";

const containerStyle: SxProps<Theme> = {
  overflow: "hidden",
  backgroundColor: "background.default",
};

const getSlideContainerStyle = (
  userReadingAxis: UserReadingAxis,
  comicDirection: ComicDirection,
): SxProps<Theme> => {
  // TODO: Improve typing
  let flexDirection: "column" | "row" | "row-reverse" = "column";

  if (userReadingAxis === "horizontal") {
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

const pageStyle: SxProps<Theme> = {
  flex: "0 0 100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const imageStyle: CSSProperties = {
  padding: "40px",
  objectFit: "contain",
};

export type ComicReaderViewportProps = Readonly<{
  user: User;
  comic: Comic;
  comicPages: Array<ComicPage>;
  carouselRef: EmblaViewportRefType;
}>;

// TODO: Make image responsive
export const ComicReaderViewport = ({
  user,
  comic,
  comicPages,
  carouselRef,
}: ComicReaderViewportProps) => (
  <Box ref={carouselRef} sx={containerStyle}>
    <Box sx={getSlideContainerStyle(user.reading.axis, comic.direction)}>
      {comicPages.map((comicPage) => (
        <Box key={comicPage.id} sx={pageStyle}>
          <img
            src={comicPage.imageUrl}
            width={comicPage.imageWidth}
            height={comicPage.imageHeight}
            alt={comicPage.imageAltText}
            style={imageStyle}
          />
        </Box>
      ))}
    </Box>
  </Box>
);
