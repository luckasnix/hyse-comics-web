"use client";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import HomeIcon from "@mui/icons-material/Home";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useEventListener } from "ahooks";
import type { EmblaCarouselType } from "embla-carousel";
import Link from "next/link";

import { useComicReaderNavigation } from "~/hooks/use-comic-reader-navigation";

const containerStyle: SxProps<Theme> = {
  height: "56px",
  paddingX: "20px",
  bgcolor: "primary.main",
  justifyContent: "center",
  alignItems: "center",
};

const innerContainerStyle: SxProps<Theme> = {
  maxWidth: "1200px",
};

const iconButtonStyle: SxProps<Theme> = {
  color: "primary.contrastText",
};

const panelCounterStyle: SxProps<Theme> = {
  display: "inline-flex",
  bgcolor: "primary.dark",
  px: 2,
  py: 1,
  borderRadius: 2,
};

export type ComicReaderControllerProps = Readonly<{
  controllerApi: EmblaCarouselType | undefined;
  isFullscreen: boolean;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  toggleFullscreen: () => void;
}>;

export const ComicReaderController = ({
  controllerApi,
  isFullscreen,
  enterFullscreen,
  exitFullscreen,
  toggleFullscreen,
}: ComicReaderControllerProps) => {
  const {
    currentPanelNumber,
    panelsLength,
    canNavigateFirst,
    canNavigatePrev,
    canNavigateNext,
    canNavigateLast,
    navigateFirst,
    navigatePrev,
    navigateNext,
    navigateLast,
  } = useComicReaderNavigation(controllerApi);

  useEventListener("keydown", ({ key, shiftKey }) => {
    if (shiftKey) {
      if (key === "ArrowLeft") {
        navigateFirst();
      }
      if (key === "ArrowRight") {
        navigateLast();
      }
    } else {
      if (key === "ArrowLeft") {
        navigatePrev();
      }
      if (key === "ArrowRight") {
        navigateNext();
      }
      if (key === "f") {
        toggleFullscreen();
      }
    }
  });

  return (
    <Grid container sx={containerStyle}>
      <Grid container size="grow" sx={innerContainerStyle}>
        <Grid size={2} spacing={2} display="flex" justifyContent="start">
          <Tooltip title="Home">
            <Link href="/">
              <IconButton sx={iconButtonStyle}>
                <HomeIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Grid>
        <Grid size="grow" spacing={2} display="flex" justifyContent="center">
          <Tooltip title="First panel (shift + ←)">
            <Box component="span">
              <IconButton
                sx={iconButtonStyle}
                disabled={!canNavigateFirst}
                onClick={navigateFirst}
              >
                <FirstPageIcon />
              </IconButton>
            </Box>
          </Tooltip>
          <Tooltip title="Previous panel (←)">
            <Box component="span">
              <IconButton
                sx={iconButtonStyle}
                disabled={!canNavigatePrev}
                onClick={navigatePrev}
              >
                <NavigateBeforeIcon />
              </IconButton>
            </Box>
          </Tooltip>
          <Box component="span" sx={panelCounterStyle}>
            <Typography variant="body1" sx={{ color: "primary.contrastText" }}>
              {currentPanelNumber ?? "?"} / {panelsLength ?? "?"}
            </Typography>
          </Box>
          <Tooltip title="Next panel (→)">
            <Box component="span">
              <IconButton
                sx={iconButtonStyle}
                disabled={!canNavigateNext}
                onClick={navigateNext}
              >
                <NavigateNextIcon />
              </IconButton>
            </Box>
          </Tooltip>
          <Tooltip title="Last panel (shift + →)">
            <Box component="span">
              <IconButton
                sx={iconButtonStyle}
                disabled={!canNavigateLast}
                onClick={navigateLast}
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
        </Grid>
      </Grid>
    </Grid>
  );
};
