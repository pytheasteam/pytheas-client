import React, { Component } from "react";
import { removeBg } from "../../common/styleHelper";
import { IonButton, IonIcon, IonToolbar } from "@ionic/react";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { selectProfile } from "../../actions/profileAction";
import { fetchTrips, selectTrip, fetchExplore } from "../../actions/tripAction";
import "./Explore.scss";
import ExploreTrip from "../../components/exploreTrip/ExploreTrip";
import Loader from "../../components/loader/Loader";

export class Explore extends Component {
  componentWillUnmount() {
    removeBg("explore-bg");
  }

  componentDidMount() {
    document.body.className += " explore-bg";
    const queryString = this.props.location.search;
    if (!this.props.trips.trips || !this.props.trips.trips.length > 0) {
      this.props.fetchExplore(queryString);
    }
  }

  render() {
    let content = null;
    if (this.props.trips.trips) {
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
    console.log(content);
    return content ? (
      <div className="explore">
        <div className="header">
          <IonToolbar className="toolbar-background">
            <IonButton
              fill="clear"
              className="back-btn"
              onClick={() => this.props.history.push("/")}
            >
              <IonIcon slot="icon-only" name="arrow-back" />
            </IonButton>
          </IonToolbar>
          <p className="title">Explore</p>
        </div>
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
    fetchExplore
  }
)(Explore);
