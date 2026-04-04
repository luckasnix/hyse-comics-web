import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { IconExclamationCircle } from "@tabler/icons-react";

const containerStyle: SxProps<Theme> = {
  height: "100dvh",
  padding: 2,
  justifyContent: "center",
  alignItems: "center",
};

const textStyle: SxProps<Theme> = {
  textAlign: "center",
};

export type DefaultErrorProps = Readonly<{
  error: Error;
}>;

export const DefaultError = ({ error }: DefaultErrorProps) => (
  <Stack spacing={2} sx={containerStyle}>
    <IconExclamationCircle color="#d32f2f" size={64} />
    <Typography variant="h3" sx={textStyle}>
      Erro
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={textStyle}>
      {error.message}
    </Typography>
  </Stack>
);
