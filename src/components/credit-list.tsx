import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";

import type { CreditWithUser } from "#/types/comics";

const avatarStyle: SxProps<Theme> = {
  backgroundColor: "primary.main",
};

const creditTextStyle: SxProps<Theme> = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export type CreditListProps = Readonly<{
  credits: Array<CreditWithUser>;
  onCreditClick: (userId: string) => void;
}>;

export const CreditList = ({ credits, onCreditClick }: CreditListProps) => (
  <List>
    {credits.map((credit) => (
      <ListItemButton
        key={credit.user.id}
        onClick={() => {
          onCreditClick(credit.user.id);
        }}
      >
        <ListItemAvatar>
          <Avatar
            variant="rounded"
            sx={avatarStyle}
            src={credit.user.avatarUrl ?? ""}
          />
        </ListItemAvatar>
        <ListItemText
          primary={`@${credit.user.username}`}
          secondary={credit.role}
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
