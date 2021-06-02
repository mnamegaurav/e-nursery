import React from "react";
import PropTypes from "prop-types";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";

import { lightTheme, darkTheme } from "../theme";

const ThemeProviderComponent = (props) => {
  const { defaultTheme, children } = props;

  const theme = createMuiTheme(
    defaultTheme === "dark" ? darkTheme : lightTheme
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ThemeProviderComponent.propTypes = {
  defaultTheme: PropTypes.string.isRequired,
};

const matpStateToProps = (state) => ({
  defaultTheme: state.ui.defaultTheme,
});

export default connect(matpStateToProps)(ThemeProviderComponent);
