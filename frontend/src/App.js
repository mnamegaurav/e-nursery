import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";

import Routes from "./Routes";
import store from "./store";
import { theme } from "./layouts/theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
