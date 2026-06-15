import type { User } from "#/types/users";
import { getBaseUrl } from "#/utils/navigation";

export const getUser = async (userId: string): Promise<User> => {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/users/${userId}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch user "${userId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as User;

  return data;
};
