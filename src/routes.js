import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exac path="/login" component={Login} />
          <Route exac path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
