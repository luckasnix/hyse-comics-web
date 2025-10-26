import type { ComicDirection } from "~/types/comics";

export const comicReaderToolbarHeight = 56;

export const directionMap: Record<ComicDirection, "ltr" | "rtl"> = {
  western: "ltr",
  eastern: "rtl",
};
