import { createContext } from "react";

import type { ComicContextValue } from "./types";

export const ComicContext = createContext<ComicContextValue | null>(null);
