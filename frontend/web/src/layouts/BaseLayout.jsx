import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import { getCart } from "../store/actions/cart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  linearProgress: {
    position: "sticky",
    top: "0",
  },
}));

function BaseLayout(props) {
  const classes = useStyles();

  const { getCart, isUiLoading, children } = props;

  React.useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <div className={classes.root}>
      <HeaderComponent classes={classes} />
      {isUiLoading && (
        <LinearProgress color="secondary" className={classes.linearProgress} />
      )}
      {children}
      <FooterComponent classes={classes} />
    </div>
  );
}

BaseLayout.propTypes = {
  isUiLoading: PropTypes.bool.isRequired,
  getCart: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

const matpStateToProps = (state) => ({
  isUiLoading: state.ui.isUiLoading,
});

export default connect(matpStateToProps, { getCart })(BaseLayout);
