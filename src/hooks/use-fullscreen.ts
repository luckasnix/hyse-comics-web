import {
  type RefObject,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";

export type FullscreenActions = Readonly<{
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  toggleFullscreen: () => void;
  isEnabled: boolean;
}>;

const subscribeToFullscreen = (onStoreChange: () => void) => {
  document.addEventListener("fullscreenchange", onStoreChange);

  return () => {
    document.removeEventListener("fullscreenchange", onStoreChange);
  };
};

const getServerSnapshot = () => false;

export const useFullscreen = <TargetElement extends Element>(
  targetRef: RefObject<TargetElement | null>,
) => {
  const getSnapshot = useCallback(
    () =>
      targetRef.current !== null &&
      document.fullscreenElement === targetRef.current,
    [targetRef],
  );

  const isFullscreen = useSyncExternalStore(
    subscribeToFullscreen,
    getSnapshot,
    getServerSnapshot,
  );

  const isEnabled =
    typeof document !== "undefined" && document.fullscreenEnabled;

  const enterFullscreen = useCallback(() => {
    const element = targetRef.current;

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
  }, [isEnabled, targetRef]);

  const exitFullscreen = useCallback(() => {
    const element = targetRef.current;

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
  }, [targetRef]);

  const toggleFullscreen = useCallback(() => {
    const element = targetRef.current;

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
  }, [enterFullscreen, exitFullscreen, targetRef]);

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
