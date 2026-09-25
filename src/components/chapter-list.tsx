import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";
import { IconSwitchVertical } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ListState } from "#/components/list-state.tsx";
import type { Chapter } from "#/types/comics.ts";

export type ChapterListProps = Readonly<{
  chapters: Array<Chapter>;
  selectedChapterId: string | null;
  onChapterClick: (chapterId: string) => void;
}>;

const avatarStyle: SxProps<Theme> = {
  backgroundColor: "primary.main",
};

const orderActionStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "flex-end",
  paddingX: 2,
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
  const [isReversed, setIsReversed] = useState(false);

  if (chapters.length === 0) {
    return <ListState kind="empty" message={t("lists.noChaptersFound")} />;
  }

  const numberedChapters = chapters.map((chapter, index) => ({
    chapter,
    number: index + 1,
  }));

  if (isReversed) {
    numberedChapters.reverse();
  }

  return (
    <>
      {chapters.length > 1 && (
        <Box sx={orderActionStyle}>
          <Button
            size="small"
            startIcon={<IconSwitchVertical size={16} />}
            aria-pressed={isReversed}
            onClick={() => setIsReversed((current) => !current)}
          >
            {t("lists.reverseChapterOrder")}
          </Button>
        </Box>
      )}
      <List>
        {numberedChapters.map(({ chapter, number }) => (
          <ListItemButton
            key={chapter.id}
            selected={chapter.id === selectedChapterId}
            onClick={() => {
              onChapterClick(chapter.id);
            }}
          >
            <ListItemAvatar>
              <Avatar variant="rounded" sx={avatarStyle}>
                {number}
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
    </>
  );
};
