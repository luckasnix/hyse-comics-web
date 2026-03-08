import type { User } from "#/types/users";
import { getBaseUrl } from "#/utils/navigation";

const baseUrl = getBaseUrl();

export const getUser = async (userId: string): Promise<User> => {
  const response = await fetch(`${baseUrl}/api/users/${userId}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch user "${userId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as User;

  return data;
};
