import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {
  Activity,
  createContext,
  type ReactNode,
  type SyntheticEvent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

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

const TabGroupContext = createContext<TabGroupContextValue | null>(null);

const useTabGroup = () => {
  const context = useContext(TabGroupContext);

  if (!context) {
    throw new Error("TabGroup components must be used within TabGroup.");
  }

  return context;
};

const TabContainer = ({ initialValue, children }: TabContainerProps) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const selectValue = useCallback((_: SyntheticEvent, newValue: number) => {
    setSelectedValue(newValue);
  }, []);

  const value = useMemo(
    () => ({ selectedValue, selectValue }),
    [selectedValue, selectValue],
  );

  return (
    <TabGroupContext.Provider value={value}>
      {children}
    </TabGroupContext.Provider>
  );
};

const TabList = ({ items }: TabListProps) => {
  const { selectedValue, selectValue } = useTabGroup();

  return (
    <Tabs value={selectedValue} onChange={selectValue}>
      {items.map((item) => (
        <Tab key={item.value} label={item.label} value={item.value} />
      ))}
    </Tabs>
  );
};

const TabPanel = ({ value, children }: TabPanelProps) => {
  const { selectedValue } = useTabGroup();

  return (
    <Activity mode={value === selectedValue ? "visible" : "hidden"}>
      <Box role="tabpanel">{children}</Box>
    </Activity>
  );
};

export const TabGroup = Object.assign(TabContainer, {
  List: TabList,
  Panel: TabPanel,
});
