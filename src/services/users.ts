import type { UserComicWork } from "#/types/comics";
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

export const getUserWorks = async (
  userId: string,
): Promise<Array<UserComicWork>> => {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/users/${userId}/works`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch works for user "${userId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as Array<UserComicWork>;

  return data;
};
