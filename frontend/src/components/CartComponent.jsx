import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import NoImage from "../assets/img/oops-no-image.jpg";
import { emptyCart, removePlantFromCart } from "../store/actions/cart";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.up("md")]: {
      maxWidth: "90%",
    },
  },
  card: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4),
    },
  },
  cardContent: {
    flexGrow: 1,
  },
  cardImage: {
    height: "4rem",
    marginLeft: "0",
  },
  cardRow: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  plantDetail: {
    textAlign: "end",
  },
  cardActions: {
    display: "flex",
    alignSelf: "flex-end",
    marginRight: "10px",
  },
  removePlantButton: {
    marginTop: theme.spacing(1),
  },
}));

function CartComponent(props) {
  const classes = useStyles();

  const { emptyCart, removePlantFromCart, cart } = props;
  const { all_plants: plants, total_price: totalPrice } = cart;

  const handleEmptyCart = () => {
    emptyCart();
  };

  const handleDeleteItem = (plantId) => {
    removePlantFromCart(plantId);
  };

  const handleCheckout = () => {
    console.log("checked out");
  };

  const renderPlants = () => {
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
              <Typography variant="h5">{plant.name}</Typography>
              <Typography variant="h4">₹ {plant.price}</Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(plant.added_on).toLocaleString()}
              </Typography>
              <Button
                size="small"
                color="secondary"
                onClick={() => handleDeleteItem(plant.id)}
                startIcon={<DeleteIcon />}
                className={classes.removePlantButton}
              >
                Remove
              </Button>
            </div>
          </div>
          <Divider />
        </div>
      );
    });
  };

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              My Cart
            </Typography>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Card className={classes.card}>
                {plants.length ? (
                  <>
                    <CardContent className={classes.cardContent}>
                      {renderPlants()}
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={handleEmptyCart}
                        variant="outlined"
                      >
                        Clear
                      </Button>
                    </CardActions>
                  </>
                ) : (
                  <Typography variant="h2" color="textSecondary" align="center">
                    No Items
                  </Typography>
                )}
              </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h2">₹ {totalPrice}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="large"
                    color="secondary"
                    onClick={handleCheckout}
                    variant="contained"
                    fullWidth
                    disabled={plants.length ? false : true}
                  >
                    Checkout
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

CartComponent.propTypes = {
  // You can declare that a prop is a specific JS primitive.
  cart: PropTypes.object.isRequired,
  emptyCart: PropTypes.func.isRequired,
  removePlantFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

export default connect(mapStateToProps, {
  emptyCart,
  removePlantFromCart,
})(CartComponent);
