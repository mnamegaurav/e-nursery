import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCart } from "../store/actions/cart";

function CartComponent(props) {
  React.useEffect(() => {
    props.getCart();
  }, []);

  return <div>Cart</div>;
}

CartComponent.propTypes = {
  // You can declare that a prop is a specific JS primitive.
  cart: PropTypes.object,
  getCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
});

export default connect(mapStateToProps, { getCart })(CartComponent);
