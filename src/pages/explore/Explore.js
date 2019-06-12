import React, { Component } from "react";
import { removeBg } from "../../common/styleHelper";
import { IonButton, IonIcon, IonToolbar } from "@ionic/react";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { selectProfile } from "../../actions/profileAction";
import { fetchTrips } from "../../actions/tripAction";
import "./Explore.scss";
import ExploreTrip from "../../components/exploreTrip/ExploreTrip";

export class Explore extends Component {
  componentWillUnmount() {
    removeBg("explore-bg");
  }

  componentDidMount() {
    document.body.className += " explore-bg";
  }

  // viewAttraction = (day, attractionId) => {
  //   this.props.history.push(`/attractions/${day}/${attractionId}`);
  // };

  render() {
    // const trip = this.props.trips.trips[this.props.match.params.id];
    // if (!trip) {
    //   this.props.history.push("/");
    //   return null;
    // }
    // TODO: Move to external function

    return (
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
        <ExploreTrip />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.token,
    trips: state.trips
  };
};

export default connect(
  mapStateToProps,
  { login, selectProfile, fetchTrips }
)(Explore);
