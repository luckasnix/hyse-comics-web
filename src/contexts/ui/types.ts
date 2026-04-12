import type { ReactNode } from "react";

import type { ToastOptions } from "#/components/toast/types";

export type UiContextValue = {
  showToast: (options: ToastOptions) => void;
};

export type UiProviderProps = Readonly<{
  children: ReactNode;
}>;
