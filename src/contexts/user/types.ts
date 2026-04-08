import type { ReactNode } from "react";

import type { User } from "#/types/users";

export type UserContextValue = {
  user: User;
};

export type UserProviderProps = Readonly<
  UserContextValue & {
    children: ReactNode;
  }
>;
