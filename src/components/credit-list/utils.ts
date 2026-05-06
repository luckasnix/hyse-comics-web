import { roleLabelsFrom } from "#/constants/users";
import type { CreditWithUser } from "#/types/comics";

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
