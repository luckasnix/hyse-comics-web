import { setI18n } from "react-i18next";

import { createI18n } from "./src/i18n/instance.ts";

export const i18n = createI18n();

setI18n(i18n);
