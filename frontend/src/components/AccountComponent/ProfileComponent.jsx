import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

export default function OrdersComponent(props) {
  const { classes } = props;
  return (
    <>
      <Card className={classes.card}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Profile
            </Typography>
          </Grid>
          <Grid item xs={12}>
            my details
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
