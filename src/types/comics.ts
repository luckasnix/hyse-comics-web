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
  imageUrl: string;
  imageAltText: string;
};

export type ComicPage = {
  id: string;
  comicId: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  imageAltText: string;
};

export type ComicRecommendation = {
  id: string;
  title: string;
  comics: Array<Comic>;
};
