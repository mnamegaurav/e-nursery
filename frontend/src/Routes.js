import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoutes";

import HomeComponent from "./components/HomeComponent";
import SignInComponent from "./components/SignInComponent";
import SignUpComponent from "./components/SignUpComponent";
import PageNotFoundComponent from "./components/PageNotFoundComponent";

export const routes = {
  root: "/",
  signin: "/signin",
  signup: "/signup",
};

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
