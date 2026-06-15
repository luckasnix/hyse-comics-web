import { createIsomorphicFn } from "@tanstack/react-start";

const getRuntimeOrigin = createIsomorphicFn()
  .server(async () => {
    const { getRequestUrl } = await import("@tanstack/react-start/server");

    return getRequestUrl().origin;
  })
  .client(() => window.location.origin);

export const getBaseUrl = async (): Promise<string> => {
  return getRuntimeOrigin();
};
