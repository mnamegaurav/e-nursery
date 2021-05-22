import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCart } from "../store/actions/cart";

export class CartComponent extends Component {
  componentDidMount() {
    this.props.getCart();
  }
  render() {
    return <div>Cart</div>;
  }
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
