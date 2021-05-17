import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeComponent from "./components/HomeComponent";
import PageNotFoundComponent from "./components/PageNotFoundComponent";

export const routes = {
  root: "/",
};

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path={routes.root} exact component={HomeComponent} />
        <Route component={PageNotFoundComponent} />
      </Switch>
    </Router>
  );
}
