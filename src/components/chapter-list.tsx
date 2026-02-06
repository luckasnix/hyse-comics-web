import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { IconCircleXFilled } from "@tabler/icons-react";

import type { Chapter } from "#/types/comics";

const avatarStyle: SxProps<Theme> = {
  backgroundColor: "primary.main",
};

const chapterTextStyle: SxProps<Theme> = {
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

export type ChapterListProps = Readonly<{
  chapters: Array<Chapter>;
  selectedChapterId: string | null;
  onChapterClick: (chapterId: string) => void;
}>;

export const ChapterList = ({
  chapters,
  selectedChapterId,
  onChapterClick,
}: ChapterListProps) => {
  if (chapters.length === 0) {
    return (
      <Box sx={emptyListStyle}>
        <IconCircleXFilled size={48} />
        <Typography variant="body1">No chapters found</Typography>
      </Box>
    );
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
