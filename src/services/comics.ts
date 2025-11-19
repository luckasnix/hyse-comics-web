import type { Chapter, Comic, Page, Recommendation } from "~/types/comics";

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

export const getChapters = async (comicId: string): Promise<Array<Chapter>> => {
  const response = await fetch(`/api/comics/${comicId}/chapters`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch chapters for comic "${comicId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as Array<Chapter>;

  return data;
};

export const getChapter = async (chapterId: string): Promise<Chapter> => {
  const response = await fetch(`/api/chapters/${chapterId}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch chapter "${chapterId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as Chapter;

  return data;
};

export const getPages = async (chapterId: string): Promise<Array<Page>> => {
  const response = await fetch(`/api/chapters/${chapterId}/pages`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch pages for chapter "${chapterId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as Array<Page>;

  return data;
};

export const getPage = async (pageId: string): Promise<Page> => {
  const response = await fetch(`/api/pages/${pageId}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch page "${pageId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as Page;

  return data;
};

export const getRecommendations = async (): Promise<Array<Recommendation>> => {
  const response = await fetch("/api/recommendations");
  if (!response.ok) {
    throw new Error(
      `Failed to fetch comic recommendations: ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as Array<Recommendation>;

  return data;
};

export const getRecommendation = async (
  recommendationId: string,
): Promise<Recommendation> => {
  const response = await fetch(`/api/recommendations/${recommendationId}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch recommendation "${recommendationId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as Recommendation;

  return data;
};
