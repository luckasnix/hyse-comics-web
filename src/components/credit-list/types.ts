import type { CreditWithUser } from "#/types/comics";

export type CreditListProps = Readonly<{
  credits: Array<CreditWithUser>;
  onCreditClick: (userId: string) => void;
}>;
