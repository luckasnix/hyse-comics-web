// TODO: This type should come from the Embla Carousel
export type AxisOptionType = "x" | "y";

// TODO: This type should come from the Embla Carousel
export type AxisDirectionOptionType = "ltr" | "rtl";

export type ComicStructure = "single-panel" | "traditional" | "long-scroll";

export type ComicOrientation = "landscape" | "portrait";

export type ComicDirection = "western" | "eastern";

export type ComicGenre =
  | "action"
  | "adventure"
  | "biography"
  | "comedy"
  | "crime"
  | "drama"
  | "educational"
  | "fantasy"
  | "historical"
  | "horror"
  | "mystery"
  | "post-apocalyptic"
  | "psychological"
  | "romance"
  | "satire"
  | "sci-fi"
  | "slice-of-life"
  | "sport"
  | "superhero"
  | "supernatural"
  | "thriller"
  | "war"
  | "western";

export type Comic = {
  id: string;
  structure: ComicStructure;
  orientation: ComicOrientation;
  direction: ComicDirection;
  genres: Array<ComicGenre>;
  title: string;
  synopsis: string;
  thumbnailUrl: string;
  coverUrl: string;
};

export type Chapter = {
  id: string;
  comicId: string;
  title: string;
  synopsis: string;
};

export type PageBackgroundTexture =
  | "black-paper"
  | "newspaper"
  | "parchment"
  | "white-paper";

export type Page = {
  id: string;
  chapterId: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  backgroundTexture: PageBackgroundTexture | null;
};

export type ChapterWithComic = Chapter & {
  comic: Comic;
};

export type Recommendation = {
  id: string;
  title: string;
  chapters: Array<ChapterWithComic>;
};
