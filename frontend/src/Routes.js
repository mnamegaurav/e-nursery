import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HomeComponent from "./components/HomeComponent";
import SignInComponent from "./components/SignInComponent";
import SignUpComponent from "./components/SignUpComponent";
import PageNotFoundComponent from "./components/PageNotFoundComponent";

import BaseLayout from "./layouts/BaseLayout";

export const routes = {
  root: "/",
  signin: "/signin",
  signup: "/signup",
};

function PrivateRoute({ component: Component, auth, ...rest }) {
  const isLoading = auth || false;
  const isAuthenticated = auth || true;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) {
          return <h2 className="text-center mt-5">Loading...</h2>;
        } else if (!isAuthenticated) {
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

export default function Routes() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path={routes.root} exact component={HomeComponent} />
        <Route path={routes.signin} exact component={SignInComponent} />
        <Route path={routes.signup} exact component={SignUpComponent} />
        <Route component={PageNotFoundComponent} />
      </Switch>
    </Router>
  );
}
