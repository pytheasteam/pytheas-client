import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Explore from "./pages/explore/Explore";
import Profile from "./pages/profile/Profile";
import Filter from "./pages/filter/Filter";
import ViewTrip from "./pages/trip/ViewTrip";
import ViewAttraction from "./pages/attraction/ViewAttraction";
import Tags from "./pages/tags/Tags";
import Flights from "./pages/flights/Flights";
import { Hotels } from "./pages/hotels/Hotels";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/trips/:id" component={ViewTrip} />
          <Route path="/attractions/:day/:id" component={ViewAttraction} />
          <Route path="/profile" component={Profile} />
          <Route path="/new-profile" component={Tags} />
          <Route path="/filter" component={Filter} />
          <Route path="/login" component={Login} />
          <Route path="/explore" component={Explore} />
          <Route path="/flights" component={Flights} />
          <Route path="/hotels" component={Hotels} />
          <Route exac path="/" component={Main} />
          <Route path="/*" component={Explore} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
