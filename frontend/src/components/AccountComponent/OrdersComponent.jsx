import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import NoImage from "../../assets/img/oops-no-image.jpg";
import { getOrders, cancelOrder } from "../../store/actions/orders";

function OrdersComponent(props) {
  const { classes, orders, getOrders, cancelOrder } = props;

  React.useEffect(() => {
    getOrders();
  }, [getOrders]);

  const handleCancelOrder = (orderId) => {
    cancelOrder(orderId);
  };

  const renderSingleOrder = (plants) => {
    return plants.map((plant, index) => {
      return (
        <div key={index}>
          <div className={classes.cardRow}>
            <img
              className={classes.cardImage}
              src={plant.image || NoImage}
              alt="Plant"
            />
            <div className={classes.plantDetail}>
              <Typography variant="h6">{plant.name}</Typography>
              <Typography variant="h5">₹ {plant.price}</Typography>
            </div>
          </div>
          <Divider />
        </div>
      );
    });
  };

  const renderOrders = () => {
    return orders.map((order, index) => {
      return (
        <div key={index}>
          <Accordion defaultExpanded className={classes.orderAccordian}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <div>
                <Typography variant="body2" color="textSecondary">
                  Order ID - {order.id}
                </Typography>
                <Typography variant="h5">{order.name}</Typography>
                <Typography variant="h4">₹ {order.total_price}</Typography>
                {order.is_active ? (
                  <Typography variant="h6" color="textSecondary">
                    On its Way
                  </Typography>
                ) : (
                  <Typography variant="h6" color="error">
                    Cancelled
                  </Typography>
                )}
                <Typography variant="body2" color="textSecondary">
                  {new Date(order.added_on).toLocaleString()}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.cardContent}>
              {renderSingleOrder(order.all_plants)}
            </AccordionDetails>
            <Divider />
            {order.is_active && (
              <AccordionActions>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleCancelOrder(order.id)}
                >
                  Request Cancellation
                </Button>
              </AccordionActions>
            )}
          </Accordion>
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
  cancelOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
});

export default connect(mapStateToProps, { getOrders, cancelOrder })(
  OrdersComponent
);
