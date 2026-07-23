import {
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export type FullscreenActions = Readonly<{
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  toggleFullscreen: () => void;
  isEnabled: boolean;
}>;

export const useFullscreen = <TargetElement extends Element>(
  target: RefObject<TargetElement | null>,
) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isEnabled =
    typeof document !== "undefined" && document.fullscreenEnabled;

  const updateFullscreenState = useCallback(() => {
    setIsFullscreen(
      typeof document !== "undefined" &&
        document.fullscreenElement === target.current,
    );
  }, [target]);

  const enterFullscreen = useCallback(() => {
    const element = target.current;

    if (
      !isEnabled ||
      !element ||
      typeof element.requestFullscreen !== "function"
    ) {
      return;
    }

    try {
      void element.requestFullscreen().catch(() => undefined);
    } catch {
      // Fullscreen is optional and must not interrupt the reader.
    }
  }, [isEnabled, target]);

  const exitFullscreen = useCallback(() => {
    const element = target.current;

    if (
      typeof document === "undefined" ||
      !element ||
      document.fullscreenElement !== element ||
      typeof document.exitFullscreen !== "function"
    ) {
      return;
    }

    try {
      void document.exitFullscreen().catch(() => undefined);
    } catch {
      // Exiting fullscreen may fail if the browser has already left it.
    }
  }, [target]);

  const toggleFullscreen = useCallback(() => {
    const element = target.current;

    if (!element) {
      return;
    }

    if (
      typeof document !== "undefined" &&
      document.fullscreenElement === element
    ) {
      exitFullscreen();
      return;
    }

    enterFullscreen();
  }, [enterFullscreen, exitFullscreen, target]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    updateFullscreenState();
    document.addEventListener("fullscreenchange", updateFullscreenState);

    return () => {
      document.removeEventListener("fullscreenchange", updateFullscreenState);
    };
  }, [updateFullscreenState]);

  const actions = useMemo<FullscreenActions>(
    () => ({
      enterFullscreen,
      exitFullscreen,
      toggleFullscreen,
      isEnabled,
    }),
    [enterFullscreen, exitFullscreen, toggleFullscreen, isEnabled],
  );

  return [isFullscreen, actions] as const;
};
