import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import type { Comic } from "~/types/comics";

const containerStyle: SxProps<Theme> = {
  width: 420,
  padding: 3,
};

export type ComicReaderDrawerProps = Readonly<{
  isOpen: boolean;
  onClose: () => void;
  comic: Comic;
}>;

export const ComicReaderDrawer = ({
  isOpen,
  onClose,
  comic,
}: ComicReaderDrawerProps) => (
  <Drawer open={isOpen} anchor="right" onClose={onClose}>
    <Box sx={containerStyle}>
      <Box>
        <Typography variant="h4" gutterBottom>
          {comic.title}
        </Typography>
        <Typography variant="body1">{comic.synopsis}</Typography>
      </Box>
    </Box>
  </Drawer>
);
