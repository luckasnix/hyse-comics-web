"use client";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type { EmblaCarouselType } from "embla-carousel";

import { useCarouselNavigation } from "~/hooks/use-carousel-navigation";

const containerStyle: SxProps<Theme> = {
  height: "56px",
  bgcolor: "primary.main",
  justifyContent: "center",
  alignItems: "center",
};

const iconButtonStyle: SxProps<Theme> = {
  color: "primary.contrastText",
};

const panelCounterStyle: SxProps<Theme> = {
  bgcolor: "primary.dark",
  px: 2,
  py: 1,
  borderRadius: 2,
};

export type ComicReaderControllerProps = Readonly<{
  controllerApi: EmblaCarouselType | undefined;
  isFullscreen: boolean;
  onEnterFullscreen: () => void;
  onExitFullscreen: () => void;
}>;

export const ComicReaderController = ({
  controllerApi,
  isFullscreen,
  onEnterFullscreen,
  onExitFullscreen,
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
  } = useCarouselNavigation(controllerApi);

  return (
    <Stack direction="row" spacing={2} sx={containerStyle}>
      <Tooltip title="First panel">
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
      <Tooltip title="Previous panel">
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
      <Tooltip title="Next panel">
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
      <Tooltip title="Last panel">
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
      {isFullscreen ? (
        <Tooltip title="Exit fullscreen">
          <Box component="span">
            <IconButton sx={iconButtonStyle} onClick={onExitFullscreen}>
              <FullscreenExitIcon />
            </IconButton>
          </Box>
        </Tooltip>
      ) : (
        <Tooltip title="Enter fullscreen">
          <Box component="span">
            <IconButton sx={iconButtonStyle} onClick={onEnterFullscreen}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Tooltip>
      )}
    </Stack>
  );
};
