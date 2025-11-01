import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import type { Comic, ComicChapter } from "~/types/comics";

const containerStyle: SxProps<Theme> = {
  width: 420,
};

const overviewStyle: SxProps<Theme> = {
  padding: 3,
};

const avatarStyle: SxProps<Theme> = {
  backgroundColor: "primary.main",
};

const chapterTextStyle: SxProps<Theme> = {
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export type ComicReaderDrawerProps = Readonly<{
  comic: Comic;
  comicChapters: Array<ComicChapter>;
  isOpen: boolean;
  onClose: () => void;
}>;

export const ComicReaderDrawer = ({
  comic,
  comicChapters,
  isOpen,
  onClose,
}: ComicReaderDrawerProps) => (
  <Drawer open={isOpen} anchor="right" onClose={onClose}>
    <Box sx={containerStyle}>
      <Box sx={overviewStyle}>
        <Typography variant="h4" gutterBottom>
          {comic.title}
        </Typography>
        <Typography variant="body1">{comic.synopsis}</Typography>
      </Box>
      <List>
        {comicChapters.map((comicChapter, index) => {
          const comicChapterNumber = index + 1;

          return (
            <ListItemButton
              key={comicChapter.id}
              selected={false} // TODO: Select the current chapter
              onClick={() => {}} // TODO: Navigate between chapters with clicks
            >
              <ListItemAvatar>
                <Avatar variant="rounded" sx={avatarStyle}>
                  {comicChapterNumber}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Chapter ${comicChapterNumber}`}
                secondary={comicChapter.title}
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
          );
        })}
      </List>
    </Box>
  </Drawer>
);
