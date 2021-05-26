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

  const { getCart, plantsCountInCart, isUiLoading, children } = props;

  React.useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <div className={classes.root}>
      <HeaderComponent
        classes={classes}
        plantsCountInCart={plantsCountInCart}
      />
      {isUiLoading && (
        <LinearProgress color="secondary" className={classes.linearProgress} />
      )}
      {children}
      <FooterComponent
        classes={classes}
        plantsCountInCart={plantsCountInCart}
      />
    </div>
  );
}

BaseLayout.propTypes = {
  plantsCountInCart: PropTypes.number.isRequired,
  isUiLoading: PropTypes.bool.isRequired,
};

const matpStateToProps = (state) => ({
  plantsCountInCart: state.cart.cart.plants.length,
  isUiLoading: state.ui.isUiLoading,
});

export default connect(matpStateToProps, { getCart })(BaseLayout);
