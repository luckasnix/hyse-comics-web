import { useContext } from "react";

import { UiContext } from "./context";

export const useUi = () => {
  const context = useContext(UiContext);

  if (!context) {
    throw new Error("The hook 'useUi' must be used inside 'UiProvider'.");
  }

  return context;
};
