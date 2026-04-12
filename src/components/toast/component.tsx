import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import type { SxProps, Theme } from "@mui/material/styles";

import type { ToastProps } from "./types";

const alertStyle: SxProps<Theme> = {
  width: "100%",
};

export const Toast = ({ open, onClose, severity, message }: ToastProps) => (
  <Snackbar
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    open={open}
    autoHideDuration={2000}
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
