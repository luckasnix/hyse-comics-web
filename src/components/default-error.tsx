import Stack from "@mui/material/Stack";
import { type SxProps, type Theme, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { IconExclamationCircle } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const containerStyle: SxProps<Theme> = {
  height: "100dvh",
  padding: 2,
  justifyContent: "center",
  alignItems: "center",
};

const textStyle: SxProps<Theme> = {
  textAlign: "center",
};

const errorMessageStyle: SxProps<Theme> = {
  ...textStyle,
  color: "text.secondary",
};

export const DefaultError = () => {
  const { t } = useTranslation();

  const theme = useTheme();

  return (
    <Stack spacing={2} sx={containerStyle}>
      <IconExclamationCircle size={64} color={theme.palette.error.main} />
      <Typography variant="h3" sx={textStyle}>
        {t("errors.error")}
      </Typography>
      <Typography variant="body1" sx={errorMessageStyle}>
        {t("errors.defaultDescription")}
      </Typography>
    </Stack>
  );
};
