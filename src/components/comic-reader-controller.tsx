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

const containerStyle: SxProps<Theme> = {
  height: "56px",
  bgcolor: "primary.main",
  justifyContent: "center",
  alignItems: "center",
};

const iconButtonStyle: SxProps<Theme> = {
  color: "primary.contrastText",
};

export type ComicReaderControllerProps = Readonly<{
  isFirstButtonDisabled: boolean;
  isPrevButtonDisabled: boolean;
  isNextButtonDisabled: boolean;
  isLastButtonDisabled: boolean;
  onFirstButtonClick: () => void;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
  onLastButtonClick: () => void;
  isFullscreen: boolean;
  onEnterFullscreen: () => void;
  onExitFullscreen: () => void;
}>;

export const ComicReaderController = ({
  isFirstButtonDisabled,
  isPrevButtonDisabled,
  isNextButtonDisabled,
  isLastButtonDisabled,
  onFirstButtonClick,
  onPrevButtonClick,
  onNextButtonClick,
  onLastButtonClick,
  isFullscreen,
  onEnterFullscreen,
  onExitFullscreen,
}: ComicReaderControllerProps) => (
  <Stack direction="row" spacing={2} sx={containerStyle}>
    <Tooltip title="First panel">
      <Box component="span">
        <IconButton
          sx={iconButtonStyle}
          disabled={isFirstButtonDisabled}
          onClick={onFirstButtonClick}
        >
          <FirstPageIcon />
        </IconButton>
      </Box>
    </Tooltip>
    <Tooltip title="Previous panel">
      <Box component="span">
        <IconButton
          sx={iconButtonStyle}
          disabled={isPrevButtonDisabled}
          onClick={onPrevButtonClick}
        >
          <NavigateBeforeIcon />
        </IconButton>
      </Box>
    </Tooltip>
    <Tooltip title="Next panel">
      <Box component="span">
        <IconButton
          sx={iconButtonStyle}
          disabled={isNextButtonDisabled}
          onClick={onNextButtonClick}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Tooltip>
    <Tooltip title="Last panel">
      <Box component="span">
        <IconButton
          sx={iconButtonStyle}
          disabled={isLastButtonDisabled}
          onClick={onLastButtonClick}
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
