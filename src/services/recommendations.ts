import type { Recommendation } from "#/types/recommendations.ts";
import { getBaseUrl } from "#/utils/navigation.ts";

export const getRecommendations = async (): Promise<Array<Recommendation>> => {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/recommendations`);
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
  const baseUrl = await getBaseUrl();
  const response = await fetch(
    `${baseUrl}/api/recommendations/${recommendationId}`,
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch recommendation "${recommendationId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as Recommendation;

  return data;
};
