import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { IconExclamationCircle } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import type { DefaultErrorProps } from "./types";

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

export const DefaultError = ({ error }: DefaultErrorProps) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={2} sx={containerStyle}>
      <IconExclamationCircle color="#d32f2f" size={64} />
      <Typography variant="h3" sx={textStyle}>
        {t("errors.error")}
      </Typography>
      <Typography variant="body1" sx={errorMessageStyle}>
        {error.message}
      </Typography>
    </Stack>
  );
};
