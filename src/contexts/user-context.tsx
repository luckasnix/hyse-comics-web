import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";

import type { User } from "#/types/users";

export type UserContextValue = {
  user: User;
};

export type UserProviderProps = Readonly<
  UserContextValue & {
    children: ReactNode;
  }
>;

export const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children, user }: UserProviderProps) => {
  const value = useMemo(
    () => ({
      user,
    }),
    [user],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("The hook 'useUser' must be used inside 'UserProvider'.");
  }

  return context;
};
