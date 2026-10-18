import type { Advertisement } from "#/types/advertisements.ts";
import { getBaseUrl } from "#/utils/navigation.ts";

export const getAdvertisements = async (): Promise<Array<Advertisement>> => {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/advertisements`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch advertisements: ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as Array<Advertisement>;

  return data;
};
