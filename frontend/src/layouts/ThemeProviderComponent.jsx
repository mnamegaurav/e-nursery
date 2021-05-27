import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";

import Routes from "../Routes";
import { lightTheme, darkTheme } from "../theme";

const ThemeProviderComponent = (props) => {
  const { defaultTheme } = props;

  const theme = createMuiTheme(
    defaultTheme === "dark" ? darkTheme : lightTheme
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
};

ThemeProviderComponent.propTypes = {
  defaultTheme: PropTypes.string.isRequired,
};

const matpStateToProps = (state) => ({
  defaultTheme: state.ui.defaultTheme,
});

export default connect(matpStateToProps)(ThemeProviderComponent);
