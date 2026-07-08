import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import { ListState } from "#/components/list-state";
import { roleLabelsFrom } from "#/constants/users";
import type { CreditWithUser } from "#/types/comics";
import { keyFromCredit, rolesFromCredit } from "#/utils/users";

export type CreditListProps = Readonly<{
  credits: Array<CreditWithUser>;
  onCreditClick: (userId: string) => void;
}>;

const avatarStyle: SxProps<Theme> = {
  backgroundColor: "primary.main",
};

const creditTextStyle: SxProps<Theme> = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const CreditList = ({ credits, onCreditClick }: CreditListProps) => {
  const { t } = useTranslation();

  if (credits.length === 0) {
    return <ListState kind="empty" message={t("lists.noCreditsFound")} />;
  }

  return (
    <List>
      {credits.map((credit) => (
        <ListItemButton
          key={keyFromCredit(credit)}
          onClick={() => {
            onCreditClick(credit.user.id);
          }}
        >
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              sx={avatarStyle}
              src={credit.user.avatarUrl ?? "/fallbacks/avatar.webp"}
            />
          </ListItemAvatar>
          <ListItemText
            primary={`@${credit.user.username}`}
            secondary={rolesFromCredit(credit)
              .map((role) => t(roleLabelsFrom[role]))
              .join(", ")}
            slotProps={{
              primary: {
                sx: creditTextStyle,
              },
              secondary: {
                sx: creditTextStyle,
              },
            }}
          />
        </ListItemButton>
      ))}
    </List>
  );
};
