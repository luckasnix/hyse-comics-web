import { useContext } from "react";

import { UserContext } from "./context";

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("The hook 'useUser' must be used inside 'UserProvider'.");
  }

  return context;
};
