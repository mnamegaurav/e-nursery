import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function AlertComponent(props) {
  const { hideAlert, text /*, type*/ } = props;

  const handleClose = (event, reason) => {
    hideAlert();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(text)}
      autoHideDuration={5000}
      onClose={handleClose}
      message={text}
      action={
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
}
