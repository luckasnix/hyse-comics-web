import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { IconCircleXFilled } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { roleLabelsFrom } from "#/constants/users";
import type { UserComicWork } from "#/types/comics";
import { keyFromUserComicWork, rolesFromUserComicWork } from "#/utils/users";

export type UserWorkListProps = Readonly<{
  works: Array<UserComicWork>;
  onWorkClick: (comicId: string) => void;
}>;

const avatarStyle: SxProps<Theme> = {
  backgroundColor: "primary.main",
};

const workTextStyle: SxProps<Theme> = {
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

export const UserWorkList = ({ works, onWorkClick }: UserWorkListProps) => {
  const { t } = useTranslation();

  if (works.length === 0) {
    return (
      <Box sx={emptyListStyle}>
        <IconCircleXFilled size={48} />
        <Typography variant="body1">{t("lists.noWorksFound")}</Typography>
      </Box>
    );
  }

  return (
    <List>
      {works.map((work) => (
        <ListItemButton
          key={keyFromUserComicWork(work)}
          onClick={() => {
            onWorkClick(work.comic.id);
          }}
        >
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              sx={avatarStyle}
              src={work.comic.thumbnailUrl}
              alt={`${work.comic.title} thumbnail`}
            />
          </ListItemAvatar>
          <ListItemText
            primary={work.comic.title}
            secondary={rolesFromUserComicWork(work)
              .map((role) => t(roleLabelsFrom[role]))
              .join(", ")}
            slotProps={{
              primary: {
                sx: workTextStyle,
              },
              secondary: {
                sx: workTextStyle,
              },
            }}
          />
        </ListItemButton>
      ))}
    </List>
  );
};
