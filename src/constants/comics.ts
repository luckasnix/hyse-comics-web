import type {
  AxisDirectionOptionType,
  ComicDirection,
  ContentWarning,
} from "#/types/comics";

export const comicReaderToolbarHeight = 56;

export const carouselDirectionFrom: Record<
  ComicDirection,
  AxisDirectionOptionType
> = {
  western: "ltr",
  eastern: "rtl",
};

export const contentWarningLabelsFrom: Record<ContentWarning, string> = {
  "ai-generated": "AI-Generated Content",
  "graphic-violence": "Graphic Violence",
  "sexual-content": "Sexual Content",
  "strong-language": "Strong Language",
  "substance-use": "Substance Use",
};
