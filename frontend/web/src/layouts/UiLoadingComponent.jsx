import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function UiLoadingComponent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" size={100} />
    </div>
  );
}
