import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { connect } from "react-redux";

import { routes } from "../Routes";
import { signOut } from "../store/actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

function HeaderComponent(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();

  const { signOut, plantsCountInCart } = props;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRouteClick = (route) => {
    history.push(route);
  };

  const handleLogout = () => {
    signOut()
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h5" noWrap>
            <Link underline="none" href={routes.root} color="inherit">
              E-Nursery
            </Link>
          </Typography>
          <div className={classes.root} />
          <div className={classes.sectionDesktop}>
            <Link href={routes.cart} color="inherit">
              <IconButton aria-label="show cart plants" color="inherit">
                <Badge badgeContent={plantsCountInCart} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id="primary-search-account-menu"
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleRouteClick(routes.profile)}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => handleRouteClick(routes.orders)}>
          My Orders
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

HeaderComponent.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default connect(null, { signOut })(HeaderComponent);
