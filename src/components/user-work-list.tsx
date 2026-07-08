import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import { ListState } from "#/components/list-state";
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

export const UserWorkList = ({ works, onWorkClick }: UserWorkListProps) => {
  const { t } = useTranslation();

  if (works.length === 0) {
    return <ListState kind="empty" message={t("lists.noWorksFound")} />;
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
