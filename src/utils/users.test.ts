import { describe, expect, it } from "vitest";

import { comicsMock } from "#/mocks/comics";
import { usersMock } from "#/mocks/users";
import type { CreditWithUser, UserComicWork } from "#/types/comics";

import {
  keyFromCredit,
  keyFromUserComicWork,
  roleLabelFromCredit,
  roleLabelFromUserComicWork,
  rolesFromCredit,
  rolesFromUserComicWork,
} from "./users";

const singleRoleCreditMock: CreditWithUser = {
  user: usersMock[1].profile,
  roles: ["comics:writer"],
};

const multiRoleCreditMock: CreditWithUser = {
  user: usersMock[0].profile,
  roles: ["comics:writer", "comics:editor"],
};

const singleRoleWorkMock: UserComicWork = {
  comic: comicsMock[0],
  roles: ["comics:writer"],
};

const multiRoleWorkMock: UserComicWork = {
  comic: comicsMock[1],
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
  it("maps and joins role label translation keys", () => {
    expect(roleLabelFromCredit(multiRoleCreditMock)).toBe(
      "roles.writer, roles.editor",
    );
  });
});

describe("keyFromCredit()", () => {
  it("builds a stable key from the user id and roles", () => {
    expect(keyFromCredit(multiRoleCreditMock)).toBe(
      "xhMmYL0qjhVK:comics:writer,comics:editor",
    );
  });
});

describe("rolesFromUserComicWork()", () => {
  it("returns the roles array for single-role works", () => {
    expect(rolesFromUserComicWork(singleRoleWorkMock)).toEqual([
      "comics:writer",
    ]);
  });

  it("returns the roles array for multi-role works", () => {
    expect(rolesFromUserComicWork(multiRoleWorkMock)).toEqual([
      "comics:writer",
      "comics:editor",
    ]);
  });
});

describe("roleLabelFromUserComicWork()", () => {
  it("maps and joins role label translation keys", () => {
    expect(roleLabelFromUserComicWork(multiRoleWorkMock)).toBe(
      "roles.writer, roles.editor",
    );
  });
});

describe("keyFromUserComicWork()", () => {
  it("builds a stable key from the comic id and roles", () => {
    expect(keyFromUserComicWork(multiRoleWorkMock)).toBe(
      `${comicsMock[1].id}:comics:writer,comics:editor`,
    );
  });
});
