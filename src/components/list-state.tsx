import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { type SxProps, type Theme, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { IconCircleXFilled, IconExclamationCircle } from "@tabler/icons-react";

export type ListStateKind = "empty" | "pending" | "error";

export type ListStateProps = Readonly<{
  kind: ListStateKind;
  message: string;
}>;

const containerStyle: SxProps<Theme> = {
  paddingY: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 1,
  color: "text.secondary",
};

export const ListState = ({ kind, message }: ListStateProps) => {
  const theme = useTheme();

  const icon = (() => {
    switch (kind) {
      case "empty":
        return <IconCircleXFilled size={48} />;
      case "pending":
        return <CircularProgress size={48} color="primary" />;
      case "error":
        return (
          <IconExclamationCircle size={48} color={theme.palette.error.main} />
        );
    }
  })();

  return (
    <Box sx={containerStyle}>
      {icon}
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
};
