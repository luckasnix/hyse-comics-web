import { roleLabelsFrom } from "#/constants/users";
import type { CreditWithUser, UserComicWork } from "#/types/comics";

export const rolesFromCredit = (credit: CreditWithUser) => {
  return credit.roles;
};

export const roleLabelFromCredit = (credit: CreditWithUser) => {
  return rolesFromCredit(credit)
    .map((role) => roleLabelsFrom[role])
    .join(", ");
};

export const keyFromCredit = (credit: CreditWithUser) => {
  return `${credit.user.id}:${rolesFromCredit(credit).join(",")}`;
};

export const rolesFromUserComicWork = (work: UserComicWork) => {
  return work.roles;
};

export const roleLabelFromUserComicWork = (work: UserComicWork) => {
  return rolesFromUserComicWork(work)
    .map((role) => roleLabelsFrom[role])
    .join(", ");
};

export const keyFromUserComicWork = (work: UserComicWork) => {
  return `${work.comic.id}:${rolesFromUserComicWork(work).join(",")}`;
};
