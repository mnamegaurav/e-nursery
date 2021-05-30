import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { updateUserDetails } from "../../store/actions/auth";

function ProfileComponent(props) {
  const { classes, isUiLoading, user, updateUserDetails } = props;

  const [isEditEnabled, setIsEditEnabled] = React.useState(false);
  const [userDetail, setUserDetail] = React.useState(() => user);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // update user detail with userDetailUpdate action
    if (userDetail) {
      console.log("submitting...");
      updateUserDetails(userDetail);
    }
  };

  const handleInputChange = (e) => {
    setUserDetail((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setUserDetail((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleToggleEditButton = () => {
    setIsEditEnabled((prevState) => {
      prevState === true && setUserDetail(user);
      return !prevState;
    });
  };

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
            <CardContent className={classes.cardContent}>
              <form
                className={classes.cardContent}
                noValidate
                onSubmit={handleFormSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      color="secondary"
                      required
                      fullWidth
                      id="fullName"
                      label="Full Name"
                      name="full_name"
                      onChange={handleInputChange}
                      value={userDetail.full_name}
                      disabled={!isEditEnabled}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      color="secondary"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      onChange={handleInputChange}
                      value={userDetail.username}
                      disabled={!isEditEnabled}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      color="secondary"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleInputChange}
                      value={userDetail.email}
                      disabled={!isEditEnabled}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="secondary"
                          name="is_nursery"
                          onChange={handleCheckboxChange}
                          checked={userDetail.is_nursery}
                          disabled={!isEditEnabled}
                        />
                      }
                      label="I am a Nursery."
                    />
                  </Grid>
                </Grid>
                <CardActions className={classes.actionButtons}>
                  {isEditEnabled ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Button
                          type="button"
                          fullWidth
                          variant="outlined"
                          color="secondary"
                          disabled={!isEditEnabled}
                          onClick={handleToggleEditButton}
                        >
                          Cancel
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="secondary"
                          disabled={isUiLoading}
                          endIcon={
                            isUiLoading && <CircularProgress size={20} />
                          }
                        >
                          Update
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      disabled={isEditEnabled}
                      onClick={handleToggleEditButton}
                    >
                      Edit
                    </Button>
                  )}
                </CardActions>
              </form>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

ProfileComponent.propTypes = {
  isUiLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isUiLoading: state.ui.isUiLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateUserDetails })(
  ProfileComponent
);
