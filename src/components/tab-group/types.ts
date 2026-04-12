import type { ReactNode, SyntheticEvent } from "react";

export type TabGroupContextValue = {
  selectedValue: number;
  selectValue: (_: SyntheticEvent, newValue: number) => void;
};

export type TabContainerProps = Readonly<{
  initialValue: number;
  children: ReactNode;
}>;

export type TabItem = {
  value: number;
  label: string;
};

export type TabListProps = Readonly<{
  items: Array<TabItem>;
}>;

export type TabPanelProps = Readonly<{
  value: number;
  children: ReactNode;
}>;
