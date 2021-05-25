import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import Copyright from "../layouts/Copyright";
import SignInImage from "../assets/img/signin.jpg";
import { signIn } from "../store/actions/auth";
import { routes } from "../Routes";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${SignInImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialCredentials = {
  email: null,
  password: null,
};

function SignInComponent(props) {
  const classes = useStyles();

  const history = useHistory();

  const [crendentials, setCrendentials] = React.useState(initialCredentials);
  const { isAuthenticated, isLoading, signIn } = props;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // submit the form
    console.log("submitted");
    const { email, password } = crendentials;
    if (email && password) {
      console.log(email, password);
      signIn(email, password);
    }
  };

  const handleInputChange = (e) => {
    // Set the values into current state
    setCrendentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRouteClick = (route) => {
    history.push(route);
  };

  return (
    <>
      {isAuthenticated && <Redirect to="/" />}
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleFormSubmit}
            >
              <TextField
                variant="outlined"
                margin="normal"
                color="secondary"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                color="secondary"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                disabled={isLoading}
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link onClick={()=>handleRouteClick(routes.signup)} variant="body2" component="button" color="secondary">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link onClick={()=>handleRouteClick(routes.signup)} variant="body2" component="button" color="secondary">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

SignInComponent.propTypes = {
  signIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { signIn })(SignInComponent);
