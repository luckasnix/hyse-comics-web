import { describe, expect, it } from "vitest";

import { usersMock } from "#/mocks/users";
import type { CreditWithUser } from "#/types/comics";

import { keyFromCredit, roleLabelFromCredit, rolesFromCredit } from "./utils";

const singleRoleCreditMock: CreditWithUser = {
  user: usersMock[1].profile,
  roles: ["comics:writer"],
};

const multiRoleCreditMock: CreditWithUser = {
  user: usersMock[0].profile,
  roles: ["comics:writer", "comics:editor"],
};

describe("rolesFromCredit()", () => {
  it("returns the roles array for single-role credits", () => {
    expect(rolesFromCredit(singleRoleCreditMock)).toEqual(["comics:writer"]);
  });

  it("returns the roles array for multi-role credits", () => {
    expect(rolesFromCredit(multiRoleCreditMock)).toEqual([
      "comics:writer",
      "comics:editor",
    ]);
  });
});

describe("roleLabelFromCredit()", () => {
  it("maps and joins role labels", () => {
    expect(roleLabelFromCredit(multiRoleCreditMock)).toBe("Writer, Editor");
  });
});

describe("keyFromCredit()", () => {
  it("builds a stable key from the user id and roles", () => {
    expect(keyFromCredit(multiRoleCreditMock)).toBe(
      "xhMmYL0qjhVK:comics:writer,comics:editor",
    );
  });
});
