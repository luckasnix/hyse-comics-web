import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import type { SxProps, Theme } from "@mui/material/styles";

const containerStyle: SxProps<Theme> = {
  height: "64px",
  bgcolor: "primary.main",
  justifyContent: "center",
  alignItems: "center",
};

const iconButtonStyle: SxProps<Theme> = {
  color: "primary.contrastText",
};

export type ComicReaderControllerProps = Readonly<{
  isPrevButtonDisabled: boolean;
  isNextButtonDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
}>;

export const ComicReaderController = ({
  isPrevButtonDisabled,
  isNextButtonDisabled,
  onPrevButtonClick,
  onNextButtonClick,
}: ComicReaderControllerProps) => (
  <Stack direction="row" spacing={2} sx={containerStyle}>
    <Tooltip title="Previous panel">
      <Box component="span">
        <IconButton
          sx={iconButtonStyle}
          disabled={isPrevButtonDisabled}
          onClick={onPrevButtonClick}
        >
          <ArrowBackIcon />
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
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Tooltip>
  </Stack>
);
