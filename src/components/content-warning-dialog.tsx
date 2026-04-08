import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useState } from "react";

import { contentWarningLabelsFrom } from "#/constants/comics";
import type { ContentWarning } from "#/types/comics";

const titleContainerStyle: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
};

const iconContainerStyle: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 48,
  height: 48,
  borderRadius: "50%",
  backgroundColor: "warning.main",
  color: "warning.contrastText",
};

const contentWarningListStyle: SxProps<Theme> = {
  flexWrap: "wrap",
};

const contentWarningChipStyle: SxProps<Theme> = {
  userSelect: "none",
};

export type ContentWarningDialogProps = Readonly<{
  contentWarnings: Array<ContentWarning>;
  comicTitle: string;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}>;

export const ContentWarningDialog = ({
  contentWarnings,
  comicTitle,
  open,
  onConfirm,
  onCancel,
}: ContentWarningDialogProps) => {
  const [acknowledged, setAcknowledged] = useState(false);

  const handleClose = () => {
    setAcknowledged(false);
    onCancel();
  };

  const handleConfirm = () => {
    setAcknowledged(false);
    onConfirm();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={titleContainerStyle}>
        <Box sx={iconContainerStyle}>
          <IconAlertTriangle />
        </Box>
        Content Warning
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="body1">
            <strong>{comicTitle}</strong> contains the following sensitive
            content:
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={contentWarningListStyle}
            useFlexGap
          >
            {contentWarnings.map((contentWarning) => (
              <Chip
                key={contentWarning}
                color="warning"
                label={contentWarningLabelsFrom[contentWarning]}
                sx={contentWarningChipStyle}
              />
            ))}
          </Stack>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                checked={acknowledged}
                onChange={(_, checked) => setAcknowledged(checked)}
              />
            }
            label="I understand and wish to continue"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Go Back
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={!acknowledged}
          onClick={handleConfirm}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
