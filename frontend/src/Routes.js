import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HomeComponent from './components/HomeComponent';
import SignInComponent from './components/SignInComponent';
import SignUpComponent from './components/SignUpComponent';
import PageNotFoundComponent from './layouts/PageNotFoundComponent';
import CartComponent from './components/CartComponent';
import BaseLayout from './layouts/BaseLayout';

export const routes = {
  root: '/',
  signin: '/signin',
  signup: '/signup',
  cart: '/cart',
};

function PrivateRouteComponent({ component: Component, auth, ...rest }) {
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

const PrivateRoute = connect(mapStateToProps)(PrivateRouteComponent);

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path={routes.signin} exact component={SignInComponent} />
        <Route path={routes.signup} exact component={SignUpComponent} />
        <Route path={routes.signup} exact component={SignUpComponent} />
        <PrivateRoute path={routes.root} exact component={HomeComponent} />
        <PrivateRoute path={routes.cart} exact component={CartComponent} />
        <Route component={PageNotFoundComponent} />
      </Switch>
    </Router>
  );
}
