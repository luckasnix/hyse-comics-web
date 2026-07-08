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
  useId,
  useMemo,
  useState,
} from "react";

export type TabGroupContextValue = {
  selectedValue: number;
  selectValue: (_: SyntheticEvent, newValue: number) => void;
  getTabId: (value: number) => string;
  getPanelId: (value: number) => string;
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
  const baseId = useId();

  const [selectedValue, setSelectedValue] = useState(initialValue);

  const selectValue = useCallback((_: SyntheticEvent, newValue: number) => {
    setSelectedValue(newValue);
  }, []);

  const getTabId = useCallback(
    (value: number) => `${baseId}-tab-${value}`,
    [baseId],
  );

  const getPanelId = useCallback(
    (value: number) => `${baseId}-panel-${value}`,
    [baseId],
  );

  const value = useMemo(
    () => ({ selectedValue, selectValue, getTabId, getPanelId }),
    [selectedValue, selectValue, getTabId, getPanelId],
  );

  return (
    <TabGroupContext.Provider value={value}>
      {children}
    </TabGroupContext.Provider>
  );
};

const TabList = ({ items }: TabListProps) => {
  const { selectedValue, selectValue, getTabId, getPanelId } = useTabGroup();

  return (
    <Tabs value={selectedValue} onChange={selectValue}>
      {items.map((item) => (
        <Tab
          key={item.value}
          id={getTabId(item.value)}
          aria-controls={getPanelId(item.value)}
          label={item.label}
          value={item.value}
        />
      ))}
    </Tabs>
  );
};

const TabPanel = ({ value, children }: TabPanelProps) => {
  const { selectedValue, getTabId, getPanelId } = useTabGroup();

  const isSelected = value === selectedValue;

  return (
    <Activity mode={isSelected ? "visible" : "hidden"}>
      <Box
        id={getPanelId(value)}
        aria-labelledby={getTabId(value)}
        role="tabpanel"
        hidden={!isSelected}
      >
        {children}
      </Box>
    </Activity>
  );
};

export const TabGroup = Object.assign(TabContainer, {
  List: TabList,
  Panel: TabPanel,
});
