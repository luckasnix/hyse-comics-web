import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import { ListState } from "#/components/list-state";
import type { Chapter } from "#/types/comics";

export type ChapterListProps = Readonly<{
  chapters: Array<Chapter>;
  selectedChapterId: string | null;
  onChapterClick: (chapterId: string) => void;
}>;

const avatarStyle: SxProps<Theme> = {
  backgroundColor: "primary.main",
};

const chapterTextStyle: SxProps<Theme> = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const ChapterList = ({
  chapters,
  selectedChapterId,
  onChapterClick,
}: ChapterListProps) => {
  const { t } = useTranslation();

  if (chapters.length === 0) {
    return <ListState kind="empty" message={t("lists.noChaptersFound")} />;
  }

  return (
    <List>
      {chapters.map((chapter, index) => (
        <ListItemButton
          key={chapter.id}
          selected={chapter.id === selectedChapterId}
          onClick={() => {
            onChapterClick(chapter.id);
          }}
        >
          <ListItemAvatar>
            <Avatar variant="rounded" sx={avatarStyle}>
              {index + 1}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={chapter.title}
            secondary={chapter.synopsis}
            slotProps={{
              primary: {
                sx: chapterTextStyle,
              },
              secondary: {
                sx: chapterTextStyle,
              },
            }}
          />
        </ListItemButton>
      ))}
    </List>
  );
};
