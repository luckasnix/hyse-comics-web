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
  "ai-generated": "contentWarning.labels.aiGenerated",
  "graphic-violence": "contentWarning.labels.graphicViolence",
  "sexual-content": "contentWarning.labels.sexualContent",
  "strong-language": "contentWarning.labels.strongLanguage",
  "substance-use": "contentWarning.labels.substanceUse",
};
