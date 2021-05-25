import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import BaseLayout from "./layouts/BaseLayout";
import { routes } from "./Routes";

function PrivateRoute({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <h2 className="text-center mt-5">Loading...</h2>;
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
