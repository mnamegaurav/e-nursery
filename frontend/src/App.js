import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Routes from "./routes";
import BaseLayout from "./layouts/BaseLayout";
import { theme } from "./layouts/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BaseLayout>
        <Routes />
      </BaseLayout>
    </ThemeProvider>
  );
}

export default App;
