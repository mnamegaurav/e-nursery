import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";

import NoImage from "../../assets/img/oops-no-image.jpg";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  plant: {
    textAlign: "center",
  },
  plantDetail: {
    marginTop: theme.spacing(3),
  },
  plantImage: {
    maxWidth: "100%",
  },
  buyNowButton: {
    maxWidth: "15rem",
    margin: "1em auto",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductDetailsComponent(props) {
  const { plant, buyNow, isUiLoading } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        size="small"
        color="secondary"
        fullWidth
        variant="contained"
        onClick={handleClickOpen}
        disabled={isUiLoading}
      >
        Details
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <ArrowBackIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5} className={classes.plant}>
              <img
                className={classes.plantImage}
                src={plant.image || NoImage}
                alt="Plant"
              />
            </Grid>
            <Divider orientation="vertical" flexItem light />
            <Grid item xs={12} md={5} className={classes.plant}>
              <div className={classes.plantDetail}>
                <Typography variant="h4">{plant.name}</Typography>
                <Typography variant="h2">₹ {plant.price}</Typography>
              </div>
              <DialogActions className={classes.buyNowButton}>
                <Button
                  size="small"
                  color="secondary"
                  fullWidth
                  variant="contained"
                  onClick={buyNow}
                  disabled={isUiLoading}
                >
                  Buy Now
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

ProductDetailsComponent.propType = {
  plant: PropTypes.object.isRequired,
  buyNow: PropTypes.func.isRequired,
};
