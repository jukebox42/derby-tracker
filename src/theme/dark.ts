import { ThemeOptions } from "@mui/material/styles";

import { typography } from "./typography";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#e44297",
    },
    secondary: {
      main: "#6f8688",
    },
    background: {
      default: "#2E2D38",
      paper: "#2E2D38",
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
      primary: "#F7F7F6",
    }
  },
  typography: typography,
};