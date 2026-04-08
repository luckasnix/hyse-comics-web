import { useMemo } from "react";

import { UserContext } from "./context";
import type { UserProviderProps } from "./types";

export const UserProvider = ({ children, user }: UserProviderProps) => {
  const value = useMemo(
    () => ({
      user,
    }),
    [user],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
