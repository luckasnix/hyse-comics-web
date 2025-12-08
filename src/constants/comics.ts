import type { AxisDirectionOptionType, ComicDirection } from "#/types/comics";

export const comicReaderToolbarHeight = 56;

export const carouselDirectionFrom: Record<
  ComicDirection,
  AxisDirectionOptionType
> = {
  western: "ltr",
  eastern: "rtl",
};
