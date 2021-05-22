import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";

import Routes from "./Routes";
import store from "./store";
import { theme } from "./layouts/theme";
import { loadUser } from "./store/actions/auth";

function App() {

  React.useEffect(()=>{
    store.dispatch(loadUser());
  },[])

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
