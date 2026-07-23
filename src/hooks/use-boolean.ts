import { useCallback, useMemo, useState } from "react";

export type BooleanActions = Readonly<{
  setTrue: () => void;
  setFalse: () => void;
  set: (value: boolean) => void;
  toggle: () => void;
}>;

export const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const set = useCallback((nextValue: boolean) => {
    setValue(nextValue);
  }, []);

  const toggle = useCallback(() => {
    setValue((currentValue) => !currentValue);
  }, []);

  const actions = useMemo<BooleanActions>(
    () => ({ setTrue, setFalse, set, toggle }),
    [setTrue, setFalse, set, toggle],
  );

  return [value, actions] as const;
};
