import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { Toast, type ToastOptions, type ToastProps } from "~/components/toast";
import { theme } from "~/styles/theme";

export type UiContextValue = {
  showToast: (options: ToastOptions) => void;
};

export type UiProviderProps = Readonly<{
  children: ReactNode;
}>;

const emotionCache = createCache({ key: "css" });

export const UiContext = createContext<UiContextValue | null>(null);

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

export const useUi = () => {
  const context = useContext(UiContext);

  if (!context) {
    throw new Error("The hook 'useUi' must be used inside 'UiProvider'.");
  }

  return context;
};
