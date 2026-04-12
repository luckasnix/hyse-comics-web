import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useCallback, useState } from "react";

import { Toast } from "#/components/toast/component";
import type { ToastOptions, ToastProps } from "#/components/toast/types";
import { theme } from "#/styles/theme";

import { UiContext } from "./context";
import type { UiProviderProps } from "./types";

const emotionCache = createCache({ key: "css" });

export const UiProvider = ({ children }: UiProviderProps) => {
  const [toast, setToast] = useState<Omit<ToastProps, "onClose">>({
    open: false,
    severity: "info",
    message: "",
  });

  const closeToast = useCallback(() => {
    setToast((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  const showToast = useCallback(({ severity, message }: ToastOptions) => {
    setToast((prev) => ({
      ...prev,
      open: true,
      severity,
      message,
    }));
  }, []);

  return (
    <UiContext.Provider value={{ showToast }}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
          <Toast {...toast} onClose={closeToast} />
        </ThemeProvider>
      </CacheProvider>
    </UiContext.Provider>
  );
};
