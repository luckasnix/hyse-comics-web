import type { User } from "#/types/users";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const getUser = async (userId: string): Promise<User> => {
  const response = await fetch(`${BASE_URL}/api/users/${userId}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch user "${userId}": ${response.status} ${response.statusText}`,
    );
  }
  const data = (await response.json()) as User;

  return data;
};
