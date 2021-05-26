import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import BaseLayout from "./layouts/BaseLayout";
import UiLoadingComponent from "./layouts/UiLoadingComponent";
import { routes } from "./Routes";

function PrivateRoute({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <UiLoadingComponent />;
        } else if (!auth.isAuthenticated) {
          return <Redirect to={routes.signin} />;
        } else {
          return (
            <BaseLayout>
              <Component {...props} />
            </BaseLayout>
          );
        }
      }}
    />
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
