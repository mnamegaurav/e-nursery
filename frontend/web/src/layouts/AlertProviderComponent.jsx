import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { hideAlert } from "../store/actions/ui";

function AlertProviderComponent(props) {
  const { hideAlert, alertMessage } = props;

  const handleClose = (event, reason) => {
    hideAlert();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(alertMessage.text)}
      autoHideDuration={5000}
      onClose={handleClose}
      message={alertMessage.text}
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

AlertProviderComponent.propTypes = {
  alertMessage: PropTypes.object.isRequired,
  hideAlert: PropTypes.func.isRequired,
};

const matpStateToProps = (state) => ({
  alertMessage: state.ui.alertMessage,
});

export default connect(matpStateToProps, { hideAlert })(AlertProviderComponent);
