import type { SxProps, Theme } from "@mui/material/styles";

export const getClampedTextStyles = (lineLimit: number): SxProps<Theme> => {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lineLimit,
    overflow: "hidden",
  };
};
