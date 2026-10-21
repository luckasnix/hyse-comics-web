import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useMemo } from "react";

import { imageDimensions } from "#/constants/common.ts";
import { useCarouselNavigation } from "#/hooks/use-carousel-navigation.ts";
import type {
  Advertisement,
  AdvertisementCtaPosition,
  AdvertisementCtaTone,
} from "#/types/advertisements.ts";

export type AdvertisementShelfProps = Readonly<{
  advertisements: Array<Advertisement>;
}>;

const viewportStyle: SxProps<Theme> = {
  width: "100%",
  maxWidth: imageDimensions.advertising.width,
  minWidth: 0,
  marginX: "auto",
  borderRadius: 2,
  overflow: "hidden",
};

const slideContainerStyle: SxProps<Theme> = {
  display: "flex",
  touchAction: "pan-y pinch-zoom",
};

const slideStyle: SxProps<Theme> = {
  position: "relative",
  flex: "0 0 100%",
  minWidth: 0,
  borderRadius: 2,
  overflow: "hidden",
  aspectRatio: `${imageDimensions.advertising.width} / ${imageDimensions.advertising.height}`,
};

const imageStyle: SxProps<Theme> = {
  display: "block",
  width: "100%",
  height: "100%",
  maxWidth: imageDimensions.advertising.width,
  maxHeight: imageDimensions.advertising.height,
  objectFit: "contain",
};

const ctaContainerStyle: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  display: "flex",
  padding: {
    xs: 1,
    sm: 2,
  },
  pointerEvents: "none",
};

const ctaPositionStyles = {
  "top-left": { alignItems: "start", justifyContent: "start" },
  "top-center": { alignItems: "start", justifyContent: "center" },
  "top-right": { alignItems: "start", justifyContent: "end" },
  "center-left": { alignItems: "center", justifyContent: "start" },
  center: { alignItems: "center", justifyContent: "center" },
  "center-right": { alignItems: "center", justifyContent: "end" },
  "bottom-left": { alignItems: "end", justifyContent: "start" },
  "bottom-center": { alignItems: "end", justifyContent: "center" },
  "bottom-right": { alignItems: "end", justifyContent: "end" },
} satisfies Record<AdvertisementCtaPosition, SxProps<Theme>>;

const ctaToneStyles = {
  light: {
    backgroundColor: "#ffffff",
    color: "#000000",
    "&:hover": { backgroundColor: "#eeeeee" },
  },
  dark: {
    backgroundColor: "#000000",
    color: "#ffffff",
    "&:hover": { backgroundColor: "#222222" },
  },
} satisfies Record<AdvertisementCtaTone, SxProps<Theme>>;

export const AdvertisementShelf = ({
  advertisements,
}: AdvertisementShelfProps) => {
  const hasMultipleAdvertisements = advertisements.length > 1;

  const plugins = useMemo(
    () => (hasMultipleAdvertisements ? [Autoplay({ delay: 5000 })] : []),
    [hasMultipleAdvertisements],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: hasMultipleAdvertisements },
    plugins,
  );

  const { currentSlideNumber } = useCarouselNavigation(emblaApi);

  return (
    <Box ref={emblaRef} role="region" sx={viewportStyle}>
      <Box sx={slideContainerStyle}>
        {advertisements.map((advertisement, index) => {
          const isActive = index + 1 === (currentSlideNumber ?? 1);

          return (
            <Box
              key={advertisement.id}
              role="group"
              aria-hidden={!isActive}
              inert={!isActive}
              sx={slideStyle}
            >
              <Box
                component="img"
                src={advertisement.imageUrl}
                width={imageDimensions.advertising.width}
                height={imageDimensions.advertising.height}
                draggable={false}
                sx={imageStyle}
              />
              <Box
                sx={{
                  ...ctaContainerStyle,
                  ...ctaPositionStyles[advertisement.cta.position],
                }}
              >
                <Button
                  href={advertisement.cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  size="small"
                  sx={{
                    pointerEvents: "auto",
                    ...ctaToneStyles[advertisement.cta.tone],
                  }}
                >
                  {advertisement.cta.label}
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
