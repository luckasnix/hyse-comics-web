import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ComponentProps } from "react";

const alertStyle: SxProps<Theme> = {
  width: "100%",
};

export type ToastOptions = {
  severity: ComponentProps<typeof Alert>["severity"];
  message: string;
};

export type ToastProps = Readonly<
  ToastOptions & {
    open: boolean;
    onClose: () => void;
  }
>;

export const Toast = ({ open, onClose, severity, message }: ToastProps) => (
  <Snackbar
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    open={open}
    autoHideDuration={4000}
    onClose={onClose}
  >
    <Alert
      variant="filled"
      sx={alertStyle}
      severity={severity}
      onClose={onClose}
    >
      {message}
    </Alert>
  </Snackbar>
);
