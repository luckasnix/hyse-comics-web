import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import type { EmblaViewportRefType } from "embla-carousel-react";
import type { CSSProperties } from "react";

import { comicReaderToolbarHeight } from "~/constants/layout";
import type { ComicPage } from "~/types/comics";

const containerStyle: SxProps<Theme> = {
  overflow: "hidden",
  backgroundColor: "background.default",
};

const slideContainerStyle: SxProps<Theme> = {
  height: `calc(100dvh - ${comicReaderToolbarHeight}px)`,
  touchAction: "pan-x pinch-zoom",
  display: "flex",
  flexDirection: "column",
  cursor: "grab",
  "&:active": {
    cursor: "grabbing",
  },
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
  viewportRef: EmblaViewportRefType;
  comicPages: Array<ComicPage>;
}>;

export const ComicReaderViewport = ({
  viewportRef,
  comicPages,
}: ComicReaderViewportProps) => (
  <Box ref={viewportRef} sx={containerStyle}>
    <Box sx={slideContainerStyle}>
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
