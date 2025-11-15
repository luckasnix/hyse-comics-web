import type { SxProps, Theme } from "@mui/material/styles";

export const getClampedTextStyle = (lineLimit: number): SxProps<Theme> => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: lineLimit,
  overflow: "hidden",
});
