import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Explore from "./pages/explore/Explore";
import Profile from "./pages/profile/Profile";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exac path="/profile" component={Profile} />
          <Route exac path="/login" component={Login} />
          <Route exac path="/explore" component={Explore} />
          <Route exac path="/" component={Main} />
          <Route exac path="/*" component={Explore} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
