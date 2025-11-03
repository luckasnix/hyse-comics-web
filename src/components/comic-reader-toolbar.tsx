import FirstPageIcon from "@mui/icons-material/FirstPage";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import HomeIcon from "@mui/icons-material/Home";
import LastPageIcon from "@mui/icons-material/LastPage";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Link } from "@tanstack/react-router";
import { useEventListener } from "ahooks";
import type { EmblaCarouselType } from "embla-carousel";

import {
  carouselDirectionFrom,
  comicReaderToolbarHeight,
} from "~/constants/comics";
import { useComicContext } from "~/contexts/comic-context";
import { useCarouselDirectionalNavigation } from "~/hooks/use-carousel-directional-navigation";

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
};

const pageCounterStyle: SxProps<Theme> = {
  display: "inline-flex",
  backgroundColor: "primary.dark",
  paddingX: 2,
  paddingY: 1,
  borderRadius: 2,
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

  const { buttons, currentSlideNumber, slidesLength } =
    useCarouselDirectionalNavigation(
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
        <Grid size={2} spacing={2} display="flex" justifyContent="start">
          <Tooltip title="Home">
            <Link to="/">
              <IconButton sx={iconButtonStyle}>
                <HomeIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Grid>
        <Grid size="grow" spacing={2} display="flex" justifyContent="center">
          <Tooltip title={buttons.farLeft.label}>
            <Box component="span">
              <IconButton
                sx={iconButtonStyle}
                disabled={buttons.farLeft.disabled}
                onClick={buttons.farLeft.onClick}
              >
                <FirstPageIcon />
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
                <NavigateBeforeIcon />
              </IconButton>
            </Box>
          </Tooltip>
          <Box component="span" sx={pageCounterStyle}>
            <Typography variant="body1" sx={{ color: "primary.contrastText" }}>
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
                <NavigateNextIcon />
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
                <LastPageIcon />
              </IconButton>
            </Box>
          </Tooltip>
        </Grid>
        <Grid size={2} spacing={2} display="flex" justifyContent="end">
          {isFullscreen ? (
            <Tooltip title="Exit fullscreen (f)">
              <Box component="span">
                <IconButton sx={iconButtonStyle} onClick={exitFullscreen}>
                  <FullscreenExitIcon />
                </IconButton>
              </Box>
            </Tooltip>
          ) : (
            <Tooltip title="Enter fullscreen (f)">
              <Box component="span">
                <IconButton sx={iconButtonStyle} onClick={enterFullscreen}>
                  <FullscreenIcon />
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
                <MenuOpenIcon />
              </IconButton>
            </Box>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};
