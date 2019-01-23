import React from "react";
import Login from "./components/Login/login";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/dashboard";

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </div>
);

export default withRouter(App);
