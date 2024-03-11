"use client"
import { createTheme } from "@mui/material/styles";

import { themeOptions as lightThemeOptions } from "./light";
import { themeOptions as darkThemeOptions } from "./dark";

const theme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);

export default theme;