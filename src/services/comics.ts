import type { Comic, ComicPage } from "~/types/comics";

export const getComic = async (comicId: string): Promise<Comic> => {
  const response = await fetch(`/api/comics/${comicId}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch comic with ID "${comicId}": ${response.status} ${response.statusText}`,
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
      `Failed to fetch pages for comic with ID "${comicId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as Array<ComicPage>;

  return data;
};
