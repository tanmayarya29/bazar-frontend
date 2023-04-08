import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      main: "#F6F9FC",
    },
    secondary: {
      main: "#0F3460",
    },
    info: {
      main: "#2B3445",
    },
    error: {
      main: "#D23F57",
    },
    text: {
      primary: "#4B566B",
      secondary: "#fff",
      error: "#fff",
    },
    disabled: {
      primary: "#DADADA",
    },
  },
  typography: {
    fontFamily: [
      "Open Sans",
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      "sans-serif",
    ].join(","),
    fontSize: 14,
    span: {
      fontSize: 14,
    },
    body1: {
      fontSize: 14,
    },
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(3, 0, 71, 0.1)",
    "0px 8px 45px rgba(3, 0, 71, 0.1)",
    "0px 4px 16px rgba(43, 52, 69, 0.1)",
    ...Array(21).fill("none"),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          textTransform: "capitalize",
        },
        outlined: {
          textTransform: "capitalize",
        },
      },
    },
  },
});

export default theme;
