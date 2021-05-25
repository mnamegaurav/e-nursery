import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeComponent from "./components/HomeComponent";
import SignInComponent from "./components/SignInComponent";
import SignUpComponent from "./components/SignUpComponent";
import CartComponent from "./components/CartComponent";
import ProfileComponent from "./components/ProfileComponent";
import OrdersComponent from "./components/OrdersComponent";
import PageNotFoundComponent from "./layouts/PageNotFoundComponent";
import PrivateRoute from "./PrivateRoute";

export const routes = {
  root: "/",
  signin: "/signin",
  signup: "/signup",
  profile: "/profile",
  orders: "/orders",
  cart: "/cart",
};

export default function Routes() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path={routes.root} exact component={HomeComponent} />
        <PrivateRoute
          path={routes.profile}
          exact
          component={ProfileComponent}
        />
        <PrivateRoute path={routes.cart} exact component={CartComponent} />
        <PrivateRoute path={routes.orders} exact component={OrdersComponent} />
        <Route path={routes.signin} exact component={SignInComponent} />
        <Route path={routes.signup} exact component={SignUpComponent} />
        <Route path={routes.signup} exact component={SignUpComponent} />
        <Route component={PageNotFoundComponent} />
      </Switch>
    </Router>
  );
}
