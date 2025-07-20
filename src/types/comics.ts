export type Comic = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAltText: string;
};

export type ComicPanel = {
  id: string;
  comicId: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  imageAltText: string;
};
