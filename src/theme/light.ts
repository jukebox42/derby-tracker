import { ThemeOptions } from "@mui/material/styles";

import { typography } from "./typography";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#e44297",
    },
    secondary: {
      main: "#6f8688",
    },
    background: {
      default: "#e8e8e8",
      paper: "#f7f7f6",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#f77e2d",
    },
    success: {
      main: "#7a8e65",
    },
    info: {
      main: "#0288d1",
    },
    text: {
      primary: "#2E2D38",
    },
  },
  typography: typography,
};