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
import { Trans, useTranslation } from "react-i18next";

import { contentWarningLabelsFrom } from "#/constants/comics";

import type { ContentWarningDialogProps } from "./types";

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

export const ContentWarningDialog = ({
  contentWarnings,
  comicTitle,
  open,
  onConfirm,
  onCancel,
}: ContentWarningDialogProps) => {
  const { t } = useTranslation();

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
        {t("contentWarning.title")}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="body1">
            <Trans
              i18nKey="contentWarning.containsSensitiveContent"
              values={{ comicTitle }}
            />
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
                label={t(contentWarningLabelsFrom[contentWarning])}
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
            label={t("contentWarning.iUnderstand")}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          {t("contentWarning.goBack")}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={!acknowledged}
          onClick={handleConfirm}
        >
          {t("contentWarning.continue")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
