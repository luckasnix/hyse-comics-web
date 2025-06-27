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
  onBackButtonClick: () => void;
  onForwardButtonClick: () => void;
}>;

export const ComicReaderController = ({
  onBackButtonClick,
  onForwardButtonClick,
}: ComicReaderControllerProps) => (
  <Stack direction="row" spacing={2} sx={containerStyle}>
    <Tooltip title="Back">
      <IconButton sx={iconButtonStyle} onClick={onBackButtonClick}>
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Forward">
      <IconButton sx={iconButtonStyle} onClick={onForwardButtonClick}>
        <ArrowForwardIcon />
      </IconButton>
    </Tooltip>
  </Stack>
);
