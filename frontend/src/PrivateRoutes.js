import React from "react";
import { Route, Redirect } from "react-router-dom";

import BaseLayout from "./layouts/BaseLayout";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const isLoading = auth || false;
  const isAuthenticated = auth || true;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) {
          return <h2 className="text-center mt-5">Loading...</h2>;
        } else if (!isAuthenticated) {
          return <Redirect to="/login" />;
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
};

export default PrivateRoute;
