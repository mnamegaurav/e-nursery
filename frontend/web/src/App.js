import React from "react";
import { Provider as StoreProvider } from "react-redux";

import ThemeProviderComponent from "./layouts/ThemeProviderComponent";
import AlertProviderComponent from "./layouts/AlertProviderComponent";
import Routes from "./Routes";
import store from "./store";

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProviderComponent>
        <Routes />
        <AlertProviderComponent />
      </ThemeProviderComponent>
    </StoreProvider>
  );
}

export default App;
