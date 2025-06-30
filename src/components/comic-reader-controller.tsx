import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
}>;

export const ComicReaderController = ({
  onPrevButtonClick,
  onNextButtonClick,
}: ComicReaderControllerProps) => (
  <Stack direction="row" spacing={2} sx={containerStyle}>
    <Tooltip title="Prev panel">
      <IconButton sx={iconButtonStyle} onClick={onPrevButtonClick}>
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Next panel">
      <IconButton sx={iconButtonStyle} onClick={onNextButtonClick}>
        <ArrowForwardIcon />
      </IconButton>
    </Tooltip>
  </Stack>
);
