import type { Comic, ComicPage } from "~/types/comics";

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

export const getComicPages = async (
  comicId: string,
): Promise<Array<ComicPage>> => {
  const response = await fetch(`/api/comics/${comicId}/pages`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch pages for comic "${comicId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as Array<ComicPage>;

  return data;
};

export const getComicPage = async (
  comicId: string,
  pageId: string,
): Promise<ComicPage> => {
  const response = await fetch(`/api/comics/${comicId}/pages/${pageId}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch page "${pageId}" for comic "${comicId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as ComicPage;

  return data;
};
