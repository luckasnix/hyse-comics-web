import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconChevronLeft,
  IconChevronLeftPipe,
  IconChevronRight,
  IconChevronRightPipe,
  IconHomeFilled,
  IconLayoutSidebarLeftCollapseFilled,
} from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useEventListener } from "ahooks";
import type { EmblaCarouselType } from "embla-carousel";

import {
  carouselDirectionFrom,
  comicReaderToolbarHeight,
} from "#/constants/comics";
import { useComicContext } from "#/contexts/comic-context";
import { useComicReaderToolbar } from "#/hooks/use-comic-reader-toolbar";

const containerStyle: SxProps<Theme> = {
  height: comicReaderToolbarHeight,
  paddingX: 3,
  backgroundColor: "primary.main",
  justifyContent: "center",
  alignItems: "center",
};

const innerContainerStyle: SxProps<Theme> = {
  maxWidth: 1200,
};

const iconButtonStyle: SxProps<Theme> = {
  color: "primary.contrastText",
  borderRadius: 1,
};

const pageCounterStyle: SxProps<Theme> = {
  display: "inline-flex",
  backgroundColor: "primary.dark",
  paddingX: 2,
  paddingY: 1,
  borderRadius: 1,
};

const pageCounterTextStyle: SxProps<Theme> = {
  color: "primary.contrastText",
};

export type ComicReaderToolbarProps = Readonly<{
  carouselApi: EmblaCarouselType | undefined;
  isFullscreen: boolean;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  toggleFullscreen: () => void;
  openDrawer: () => void;
  toggleDrawer: () => void;
}>;

// TODO: Adapt reading to the comic's "orientation" settings
// TODO: Add thumbnail navigation
// TODO: Add touch navigation
// TODO: Add zoom to images
export const ComicReaderToolbar = ({
  carouselApi,
  isFullscreen,
  enterFullscreen,
  exitFullscreen,
  toggleFullscreen,
  openDrawer,
  toggleDrawer,
}: ComicReaderToolbarProps) => {
  const { comic } = useComicContext();

  const { buttons, currentSlideNumber, slidesLength } = useComicReaderToolbar(
    carouselApi,
    carouselDirectionFrom[comic.direction],
  );

  useEventListener("keydown", ({ key, shiftKey }) => {
    if (shiftKey) {
      if (key === "ArrowLeft") {
        buttons.farLeft.onClick();
      }
      if (key === "ArrowRight") {
        buttons.farRight.onClick();
      }
    } else {
      if (key === "ArrowLeft") {
        buttons.left.onClick();
      }
      if (key === "ArrowRight") {
        buttons.right.onClick();
      }
      if (key === "f") {
        toggleFullscreen();
      }
      if (key === "m") {
        toggleDrawer();
      }
    }
  });

  return (
    <Grid container sx={containerStyle}>
      <Grid container size="grow" sx={innerContainerStyle}>
        <Grid size={2} display="flex" justifyContent="start" gap="4px">
          <Tooltip title="Home">
            <Link to="/">
              <IconButton sx={iconButtonStyle}>
                <IconHomeFilled />
              </IconButton>
            </Link>
          </Tooltip>
        </Grid>
        <Grid size="grow" display="flex" justifyContent="center" gap="4px">
          <Tooltip title={buttons.farLeft.label}>
            <Box component="span">
              <IconButton
                sx={iconButtonStyle}
                disabled={buttons.farLeft.disabled}
                onClick={buttons.farLeft.onClick}
              >
                <IconChevronLeftPipe />
              </IconButton>
            </Box>
          </Tooltip>
          <Tooltip title={buttons.left.label}>
            <Box component="span">
              <IconButton
                sx={iconButtonStyle}
                disabled={buttons.left.disabled}
                onClick={buttons.left.onClick}
              >
                <IconChevronLeft />
              </IconButton>
            </Box>
          </Tooltip>
          <Box component="span" sx={pageCounterStyle}>
            <Typography variant="body1" sx={pageCounterTextStyle}>
              {currentSlideNumber ?? "?"} / {slidesLength ?? "?"}
            </Typography>
          </Box>
          <Tooltip title={buttons.right.label}>
            <Box component="span">
              <IconButton
                sx={iconButtonStyle}
                disabled={buttons.right.disabled}
                onClick={buttons.right.onClick}
              >
                <IconChevronRight />
              </IconButton>
            </Box>
          </Tooltip>
          <Tooltip title={buttons.farRight.label}>
            <Box component="span">
              <IconButton
                sx={iconButtonStyle}
                disabled={buttons.farRight.disabled}
                onClick={buttons.farRight.onClick}
              >
                <IconChevronRightPipe />
              </IconButton>
            </Box>
          </Tooltip>
        </Grid>
        <Grid size={2} display="flex" justifyContent="end" gap="4px">
          {isFullscreen ? (
            <Tooltip title="Exit fullscreen (f)">
              <Box component="span">
                <IconButton sx={iconButtonStyle} onClick={exitFullscreen}>
                  <IconArrowsMinimize />
                </IconButton>
              </Box>
            </Tooltip>
          ) : (
            <Tooltip title="Enter fullscreen (f)">
              <Box component="span">
                <IconButton sx={iconButtonStyle} onClick={enterFullscreen}>
                  <IconArrowsMaximize />
                </IconButton>
              </Box>
            </Tooltip>
          )}
          <Tooltip title="More (m)">
            <Box component="span">
              <IconButton
                sx={iconButtonStyle}
                disabled={isFullscreen}
                onClick={openDrawer}
              >
                <IconLayoutSidebarLeftCollapseFilled />
              </IconButton>
            </Box>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};
