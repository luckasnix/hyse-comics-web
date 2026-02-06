import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { IconCircleXFilled } from "@tabler/icons-react";

import type { CreditWithUser } from "#/types/comics";

const avatarStyle: SxProps<Theme> = {
  backgroundColor: "primary.main",
};

const creditTextStyle: SxProps<Theme> = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const emptyListStyle: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingY: 4,
  gap: 1,
  color: "text.secondary",
};

export type CreditListProps = Readonly<{
  credits: Array<CreditWithUser>;
  onCreditClick: (userId: string) => void;
}>;

export const CreditList = ({ credits, onCreditClick }: CreditListProps) => {
  if (credits.length === 0) {
    return (
      <Box sx={emptyListStyle}>
        <IconCircleXFilled size={48} />
        <Typography variant="body1">No credits found</Typography>
      </Box>
    );
  }

  return (
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
};
