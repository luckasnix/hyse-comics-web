import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import type { EmblaViewportRefType } from "embla-carousel-react";
import Image from "next/image";
import type { CSSProperties } from "react";

import type { ComicPanel } from "~/types/comics";

const containerStyle: SxProps<Theme> = {
  overflow: "hidden",
  bgcolor: "background.default",
};

const innerContainerStyle: SxProps<Theme> = {
  height: "calc(100dvh - 64px)",
  touchAction: "pan-x pinch-zoom",
  display: "flex",
  flexDirection: "column",
};

const panelStyle: SxProps<Theme> = {
  flex: "0 0 100%",
  display: "flex",
  justifyContent: "center",
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
    <Box sx={innerContainerStyle}>
      {comicPanels.map(
        ({ id, imageUrl, imageWidth, imageHeight, imageAltText }) => (
          <Box key={id} sx={panelStyle}>
            <Image
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
