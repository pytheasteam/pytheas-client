import React, { Component } from "react";
import { removeBg } from "../../common/styleHelper";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { selectProfile } from "../../actions/profileAction";
import {
  fetchTrips,
  selectTrip,
  fetchExplore,
  clearTrips
} from "../../actions/tripAction";
import "./Explore.scss";
import ExploreTrip from "../../components/exploreTrip/ExploreTrip";
import Loader from "../../components/loader/Loader";
import Header from "../../components/header/Header";

export class Explore extends Component {
  componentWillUnmount() {
    removeBg("explore-bg");
  }

  componentDidMount() {
    document.body.className += " explore-bg";
    const queryString = this.props.location.search;
    if (!this.props.trips.trips || !this.props.trips.trips.length > 0) {
      this.props.clearTrips();
      this.props.fetchExplore(queryString);
    }
  }

  render() {
    let content = null;
    if (this.props.trips.trips === -1) {
      this.props.history.push("/");
      return null;
    }
    if (this.props.trips.trips) {
      if (this.props.trips.trips.length === 0) {
        content = <p className="no-trip">You don't have any explore trip</p>;
      } else {
        content = this.props.trips.trips.map((trip, i) => {
          if (!trip) {
            return null;
          }
          return (
            <ExploreTrip
              key={i}
              city={trip.destination}
              price={trip.price}
              currency={trip.currency}
              days={trip.days}
              attractions={trip.places}
              viewTrip={() => {
                this.props.history.push(`/trips/${i}`);
                this.props.selectTrip(trip);
              }}
            />
          );
        });
      }
    }
    return content ? (
      <div className="explore">
        <Header title="Explore" back={() => this.props.history.push("/")} />
        <div className="explore-trip-container">{content}</div>
      </div>
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.token,
    trips: state.trips,
    explore: state.explore
  };
};

export default connect(
  mapStateToProps,
  {
    login,
    selectProfile,
    fetchTrips,
    selectTrip,
    clearTrips,
    fetchExplore
  }
)(Explore);
