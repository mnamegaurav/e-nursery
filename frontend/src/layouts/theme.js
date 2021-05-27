import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#ebebeb",
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#131314",
    },
  },
});
