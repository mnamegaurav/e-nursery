import React from "react";
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
}));

function BaseLayout(props) {
  const classes = useStyles();

  const { getCart, plantsCountInCart, children } = props;

  React.useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <div className={classes.root}>
      <HeaderComponent
        classes={classes}
        plantsCountInCart={plantsCountInCart}
      />
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
};

const matpStateToProps = (state) => ({
  plantsCountInCart: state.cart.cart.plants.length,
});

export default connect(matpStateToProps, { getCart })(BaseLayout);
