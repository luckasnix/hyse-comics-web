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

export const usersMock: Array<User> = [
  {
    profile: {
      id: "40gHsx5wC4xV",
      username: "johndoe",
      displayName: "John Doe",
      avatarUrl:
        "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/users/johndoe/av.webp",
      coverUrl:
        "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/users/johndoe/co.webp",
      preferredLanguage: "en-US",
      roles: ["comics:writer"],
    },
    preferences: {
      readingAxis: "vertical",
    },
  },
  {
    profile: {
      id: "sOXaMS9a6t8z",
      username: "joaodasilva",
      displayName: "João da Silva",
      avatarUrl:
        "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/users/joaodasilva/av.webp",
      coverUrl:
        "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/users/joaodasilva/co.webp",
      preferredLanguage: "pt-BR",
      roles: ["comics:penciller", "comics:letterer"],
    },
    preferences: {
      readingAxis: "horizontal",
    },
  },
];
