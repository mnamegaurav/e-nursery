import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import OfferImage1 from "../assets/img/image1.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  offerPaper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function OffersComponent() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Paper
              className={classes.offerPaper}
              elevation={0}
              variant="outlined"
              square
            >
              <img src={OfferImage1} alt="Offer" width="100%" />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
