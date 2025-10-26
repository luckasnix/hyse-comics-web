import type { ComicDirection } from "~/types/comics";

export const comicReaderToolbarHeight = 56;

export const carouselDirectionFrom: Record<ComicDirection, "ltr" | "rtl"> = {
  western: "ltr",
  eastern: "rtl",
};
