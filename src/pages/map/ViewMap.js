import React, { Component } from "react";
import "./ViewMap.scss";
import { removeBg } from "../../common/styleHelper";
import { IonButton, IonIcon, IonToolbar } from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { selectProfile } from "../../actions/profileAction";
import { fetchTrips } from "../../actions/tripAction";

export class ViewMap extends Component {
  componentWillUnmount() {
    removeBg("trip-main-bg");
  }

  componentDidMount() {
    document.body.className += " trip-main-bg";
  }

  render() {
    const trip = this.props.trips.trips[this.props.match.params.tripId];
    if (!trip) {
      window.history.back();
      return null;
    }
    return (
      <div className="trip-main-page">
        <div className="header">
          <IonToolbar className="toolbar-background">
            <IonButton
              fill="clear"
              onClick={() => {
                window.history.back();
              }}
              className="back-btn"
            >
              <IonIcon slot="icon-only" name="arrow-back" />
            </IonButton>
          </IonToolbar>

          <p className="trip-name">Trip to {trip.city}</p>
        </div>
        {/* <button className="go-to-map">
          <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
        </button> */}
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
)(ViewMap);
