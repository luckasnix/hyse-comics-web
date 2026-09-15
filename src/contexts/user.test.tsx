import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { renderHook } from "vitest-browser-react/pure";

import { signedInUserMock } from "#/mocks/users.ts";

import { UserProvider, useUser } from "./user.tsx";

const wrapper = ({ children }: { children: ReactNode }) => (
  <UserProvider user={signedInUserMock}>{children}</UserProvider>
);

describe("UserContext", () => {
  it("provides the user context value through UserProvider", async () => {
    const { result } = await renderHook(() => useUser(), { wrapper });

    expect(result.current).toEqual({
      user: signedInUserMock,
    });
    expect(result.current.user).toBe(signedInUserMock);
  });

  it("provides null when no user is available", async () => {
    const { result } = await renderHook(() => useUser(), {
      wrapper: ({ children }) => <UserProvider>{children}</UserProvider>,
    });

    expect(result.current.user).toBeNull();
  });

  it("throws when accessed outside UserProvider", async () => {
    await expect(renderHook(() => useUser())).rejects.toThrow(
      "The hook 'useUser' must be used inside 'UserProvider'.",
    );
  });
});
