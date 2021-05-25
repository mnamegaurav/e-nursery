import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCart } from "../store/actions/cart";

function CartComponent(props) {
  const { getCart, cart } = props;
  const { plants, total_price: totalPrice } = cart;

  React.useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <div>
        {plants.map((plant, index) => {
          <h1 key={index}>{plant.name}</h1>;
        })}
        <p>{totalPrice}</p>
      </div>
    </>
  );
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
