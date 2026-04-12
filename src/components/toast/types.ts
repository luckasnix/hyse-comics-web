import type Alert from "@mui/material/Alert";
import type { ComponentProps } from "react";

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
