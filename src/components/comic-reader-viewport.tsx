import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import type { EmblaViewportRefType } from "embla-carousel-react";
import type { CSSProperties } from "react";

import { comicReaderControllerHeight } from "~/constants/layout";
import type { ComicPanel } from "~/types/comics";

const containerStyle: SxProps<Theme> = {
  overflow: "hidden",
  backgroundColor: "background.default",
};

const slideContainerStyle: SxProps<Theme> = {
  height: `calc(100dvh - ${comicReaderControllerHeight}px)`,
  touchAction: "pan-x pinch-zoom",
  display: "flex",
  flexDirection: "column",
  cursor: "grab",
  "&:active": {
    cursor: "grabbing",
  },
};

const panelStyle: SxProps<Theme> = {
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
  comicPanels: Array<ComicPanel>;
}>;

export const ComicReaderViewport = ({
  viewportRef,
  comicPanels,
}: ComicReaderViewportProps) => (
  <Box ref={viewportRef} sx={containerStyle}>
    <Box sx={slideContainerStyle}>
      {comicPanels.map(
        ({ id, imageUrl, imageWidth, imageHeight, imageAltText }) => (
          <Box key={id} sx={panelStyle}>
            <img
              src={imageUrl}
              width={imageWidth}
              height={imageHeight}
              alt={imageAltText}
              style={imageStyle}
            />
          </Box>
        ),
      )}
    </Box>
  </Box>
);
