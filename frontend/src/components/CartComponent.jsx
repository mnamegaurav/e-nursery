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
  cart: PropTypes.object.isRequired,
  getCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

export default connect(mapStateToProps, { getCart })(CartComponent);
