import { createContext } from "react";

import type { UiContextValue } from "./types";

export const UiContext = createContext<UiContextValue | null>(null);
