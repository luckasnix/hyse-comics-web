import FirstPageIcon from "@mui/icons-material/FirstPage";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import HomeIcon from "@mui/icons-material/Home";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Link } from "@tanstack/react-router";
import { useEventListener } from "ahooks";
import type { EmblaCarouselType } from "embla-carousel";

import { comicReaderToolbarHeight } from "~/constants/comics";
import { useCarouselNavigation } from "~/hooks/use-carousel-navigation";
import type { Comic } from "~/types/comics";

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
  comic: Comic;
  carouselApi: EmblaCarouselType | undefined;
  isFullscreen: boolean;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  toggleFullscreen: () => void;
  toggleDrawer: () => void;
}>;

// TODO: Adapt reading to the comic's "orientation" settings
// TODO: Add thumbnail navigation
// TODO: Add touch navigation
// TODO: Add zoom to images
export const ComicReaderToolbar = ({
  comic,
  carouselApi,
  isFullscreen,
  enterFullscreen,
  exitFullscreen,
  toggleFullscreen,
  toggleDrawer,
}: ComicReaderToolbarProps) => {
  const {
    currentSlideNumber,
    slidesLength,
    canNavigateFirst,
    canNavigatePrev,
    canNavigateNext,
    canNavigateLast,
    navigateFirst,
    navigatePrev,
    navigateNext,
    navigateLast,
  } = useCarouselNavigation(carouselApi);

  const isWestern = comic.direction === "western";

  useEventListener("keydown", ({ key, shiftKey }) => {
    if (shiftKey) {
      if (key === "ArrowLeft") {
        isWestern ? navigateFirst() : navigateLast();
      }
      if (key === "ArrowRight") {
        isWestern ? navigateLast() : navigateFirst();
      }
    } else {
      if (key === "ArrowLeft") {
        isWestern ? navigatePrev() : navigateNext();
      }
      if (key === "ArrowRight") {
        isWestern ? navigateNext() : navigatePrev();
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
          <Tooltip
            title={`${isWestern ? "First page" : "Last page"} (shift + ←)`}
          >
            <Box component="span">
              <IconButton
                sx={iconButtonStyle}
                disabled={isWestern ? !canNavigateFirst : !canNavigateLast}
                onClick={isWestern ? navigateFirst : navigateLast}
              >
                <FirstPageIcon />
              </IconButton>
            </Box>
          </Tooltip>
          <Tooltip title={`${isWestern ? "Previous page" : "Next page"} (←)`}>
            <Box component="span">
              <IconButton
                sx={iconButtonStyle}
                disabled={isWestern ? !canNavigatePrev : !canNavigateNext}
                onClick={isWestern ? navigatePrev : navigateNext}
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
          <Tooltip title={`${isWestern ? "Next page" : "Previous page"} (→)`}>
            <Box component="span">
              <IconButton
                sx={iconButtonStyle}
                disabled={isWestern ? !canNavigateNext : !canNavigatePrev}
                onClick={isWestern ? navigateNext : navigatePrev}
              >
                <NavigateNextIcon />
              </IconButton>
            </Box>
          </Tooltip>
          <Tooltip
            title={`${isWestern ? "Last page" : "First page"} (shift + →)`}
          >
            <Box component="span">
              <IconButton
                sx={iconButtonStyle}
                disabled={isWestern ? !canNavigateLast : !canNavigateFirst}
                onClick={isWestern ? navigateLast : navigateFirst}
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
                onClick={toggleDrawer}
              >
                <ReadMoreIcon />
              </IconButton>
            </Box>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};
