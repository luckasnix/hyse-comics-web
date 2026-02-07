import type { User } from "#/types/users";

export const signedInUserMock: User = {
  profile: {
    id: "xhMmYL0qjhVK",
    username: "luckasnix",
    displayName: "Kasnix",
    avatarUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/users/luckasnix/av.webp",
    coverUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/users/luckasnix/co.webp",
    preferredLanguage: "en-US",
    roles: [
      "comics:owner",
      "comics:writer",
      "comics:letterer",
      "comics:editor",
    ],
  },
  preferences: {
    readingAxis: "vertical",
  },
};

export const usersMock: Array<User> = [signedInUserMock];
