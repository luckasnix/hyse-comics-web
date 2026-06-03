// @vitest-environment jsdom
import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";

import { signedInUserMock } from "#/mocks/users";

import { useUser } from "./hook";
import { UserProvider } from "./provider";

const wrapper = ({ children }: { children: ReactNode }) => (
  <UserProvider user={signedInUserMock}>{children}</UserProvider>
);

describe("UserContext", () => {
  it("provides the user context value through UserProvider", () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    expect(result.current).toEqual({
      user: signedInUserMock,
    });
    expect(result.current.user).toBe(signedInUserMock);
  });

  it("throws when accessed outside UserProvider", () => {
    expect(() => renderHook(() => useUser())).toThrow(
      "The hook 'useUser' must be used inside 'UserProvider'.",
    );
  });
});
