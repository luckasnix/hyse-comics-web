import { useEffect } from "react";

import type { ComicOrientation } from "#/types/comics";

export const useScreenOrientation = (
  orientation: ComicOrientation,
  isFullscreen: boolean,
) => {
  useEffect(() => {
    if (!isFullscreen) {
      return;
    }

    const screenOrientation = window.screen.orientation;

    if (
      !screenOrientation ||
      typeof screenOrientation.lock !== "function" ||
      typeof screenOrientation.unlock !== "function"
    ) {
      return;
    }

    try {
      void screenOrientation.lock(orientation).catch(() => undefined);
    } catch {
      // Orientation locking is optional and must not interrupt fullscreen.
    }

    return () => {
      try {
        screenOrientation.unlock();
      } catch {
        // Exiting fullscreen must succeed even if orientation unlocking fails.
      }
    };
  }, [isFullscreen, orientation]);
};
