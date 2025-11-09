import type {
  Comic,
  ComicChapter,
  ComicPage,
  ComicRecommendation,
} from "~/types/comics";

export const getComics = async (): Promise<Array<Comic>> => {
  const response = await fetch("/api/comics");
  if (!response.ok) {
    throw new Error(
      `Failed to fetch comics list: ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as Array<Comic>;

  return data;
};

export const getComic = async (comicId: string): Promise<Comic> => {
  const response = await fetch(`/api/comics/${comicId}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch comic "${comicId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as Comic;

  return data;
};

export const getComicChapters = async (
  comicId: string,
): Promise<Array<ComicChapter>> => {
  const response = await fetch(`/api/comics/${comicId}/chapters`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch chapters for comic "${comicId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as Array<ComicChapter>;

  return data;
};

export const getComicChapter = async (
  chapterId: string,
): Promise<ComicChapter> => {
  const response = await fetch(`/api/chapters/${chapterId}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch chapter "${chapterId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as ComicChapter;

  return data;
};

export const getComicPages = async (
  chapterId: string,
): Promise<Array<ComicPage>> => {
  const response = await fetch(`/api/chapters/${chapterId}/pages`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch pages for chapter "${chapterId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as Array<ComicPage>;

  return data;
};

export const getComicPage = async (pageId: string): Promise<ComicPage> => {
  const response = await fetch(`/api/pages/${pageId}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch page "${pageId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as ComicPage;

  return data;
};

export const getComicRecommendations = async (): Promise<
  Array<ComicRecommendation>
> => {
  const response = await fetch("/api/comics/recommendations");
  if (!response.ok) {
    throw new Error(
      `Failed to fetch comic recommendations: ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as Array<ComicRecommendation>;

  return data;
};
