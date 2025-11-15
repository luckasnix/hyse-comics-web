import Box from "@mui/material/Box";
import type {
  CSSProperties as SxCSSProperties,
  SxProps,
  Theme,
} from "@mui/material/styles";
import type { EmblaViewportRefType } from "embla-carousel-react";
import type { CSSProperties } from "react";

import { comicReaderToolbarHeight } from "~/constants/comics";
import { useComicContext } from "~/contexts/comic-context";
import { useUserContext } from "~/contexts/user-context";
import type { ComicDirection } from "~/types/comics";
import type { UserReadingAxis } from "~/types/users";

const containerStyle: SxProps<Theme> = {
  overflow: "hidden",
  backgroundColor: "background.default",
};

const getSlideContainerStyle = (
  userReadingAxis: UserReadingAxis,
  comicDirection: ComicDirection,
): SxProps<Theme> => {
  let flexDirection: SxCSSProperties["flexDirection"] = "column";

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
  width: "auto",
  height: "auto",
  maxWidth: "100%",
  maxHeight: "100%",
  padding: "40px",
};

export type ComicReaderViewportProps = Readonly<{
  carouselRef: EmblaViewportRefType;
}>;

export const ComicReaderViewport = ({
  carouselRef,
}: ComicReaderViewportProps) => {
  const { user } = useUserContext();

  const { comic, pages } = useComicContext();

  return (
    <Box ref={carouselRef} sx={containerStyle}>
      <Box sx={getSlideContainerStyle(user.reading.axis, comic.direction)}>
        {pages.map((page) => (
          <Box key={page.id} sx={pageStyle}>
            <img
              src={page.imageUrl}
              width={page.imageWidth}
              height={page.imageHeight}
              alt={`${comic.title} page`}
              style={imageStyle}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
