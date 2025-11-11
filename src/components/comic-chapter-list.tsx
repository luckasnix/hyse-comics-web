import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";

import type { ComicChapter } from "~/types/comics";

const avatarStyle: SxProps<Theme> = {
  backgroundColor: "primary.main",
};

const chapterTextStyle: SxProps<Theme> = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export type ComicChapterListProps = Readonly<{
  chapters: Array<ComicChapter>;
  selectedChapterId: string | null;
  onChapterClick: (chapterId: string) => void;
}>;

export const ComicChapterList = ({
  chapters,
  selectedChapterId,
  onChapterClick,
}: ComicChapterListProps) => (
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
