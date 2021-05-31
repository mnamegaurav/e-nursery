import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";

import ProfileComponent from "./ProfileComponent";
import OrdersComponent from "./OrdersComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      maxWidth: "90%",
    },
  },
  card: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  cardContent: {
    flexGrow: 1,
    display: "block",
    marginTop: theme.spacing(2),
  },
  cardContentOrders: {
    maxHeight: "60vh",
    overflowY: "scroll",
  },
  cardActions: {
    display: "flex",
    alignSelf: "flex-end",
    marginRight: "10px",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.up("md")]: {
      maxWidth: "90%",
    },
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
  orderAccordian: {
    marginBottom: theme.spacing(3),
  },
  actionButtons: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: theme.spacing(2),
  },
}));

export default function AccountComponent() {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.root} maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <ProfileComponent classes={classes} />
          </Grid>
          <Grid item xs={12} md={7}>
            <OrdersComponent classes={classes} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
