import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import AlertComponent from "./AlertComponent";
import { getCart } from "../store/actions/cart";
import { hideAlert } from "../store/actions/ui";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  linearProgress: {
    position: "sticky",
    top: "0",
  },
}));

function BaseLayout(props) {
  const classes = useStyles();

  const { getCart, isUiLoading, children, hideAlert, alertMessage } = props;

  React.useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <div className={classes.root}>
      <HeaderComponent classes={classes} />
      {isUiLoading && (
        <LinearProgress color="secondary" className={classes.linearProgress} />
      )}
      {children}
      <AlertComponent
        hideAlert={hideAlert}
        text={alertMessage.text}
        type={alertMessage.type}
      />
      <FooterComponent classes={classes} />
    </div>
  );
}

BaseLayout.propTypes = {
  alertMessage: PropTypes.object.isRequired,
  hideAlert: PropTypes.func.isRequired,
  isUiLoading: PropTypes.bool.isRequired,
};

const matpStateToProps = (state) => ({
  alertMessage: state.ui.alertMessage,
  isUiLoading: state.ui.isUiLoading,
});

export default connect(matpStateToProps, { getCart, hideAlert })(BaseLayout);
