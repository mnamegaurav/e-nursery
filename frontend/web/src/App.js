import React from "react";
import { Provider } from "react-redux";

import ThemeProviderComponent from "./layouts/ThemeProviderComponent";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProviderComponent />
    </Provider>
  );
}

export default App;
