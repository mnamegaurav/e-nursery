import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import NoImage from "../assets/img/oops-no-image.jpg";
import { getOrders } from "../store/actions/orders";

function OrdersComponent(props) {
  const { classes, orders, getOrders } = props;

  React.useEffect(() => {
    getOrders();
  }, [getOrders]);

  const handleCancelOrder = (plantId) => {};

  const renderOrders = () => {
    return orders.map((order, index) => {
      return (
        <div key={index}>
          <div className={classes.cardRow}>
            <div className={classes.plantDetail}>
              <Typography variant="body2" color="textSecondary">
                {" "}
                Order ID - {order.id}
              </Typography>
              <Typography variant="h5">{order.name}</Typography>
              <Typography variant="h4">₹ {order.total_price}</Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(order.added_on).toLocaleString()}
              </Typography>
              <Button
                size="small"
                color="secondary"
                onClick={() => handleCancelOrder(order.id)}
                className={classes.cancelOrderButton}
              >
                Request Cancellation
              </Button>
            </div>
            <img
              className={classes.cardImage}
              src={order.image || NoImage}
              alt="Plant"
            />
          </div>
          <Divider />
        </div>
      );
    });
  };

  return (
    <>
      <Card className={classes.card}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Orders
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {orders.length ? (
              <>
                <CardContent className={classes.cardContent}>
                  <Divider />
                  {renderOrders()}
                </CardContent>
              </>
            ) : (
              <Typography variant="h2" color="textSecondary" align="center">
                No Orders
              </Typography>
            )}
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

OrdersComponent.propTypes = {
  // You can declare that a prop is a specific JS primitive.
  orders: PropTypes.array.isRequired,
  getOrders: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
});

export default connect(mapStateToProps, { getOrders })(OrdersComponent);
