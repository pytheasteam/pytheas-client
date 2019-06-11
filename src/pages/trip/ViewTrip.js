import React, { Component } from "react";
import "./ViewTrip.scss";
import { removeBg } from "../../common/styleHelper";
import { IonButton, IonIcon } from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faBed,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { selectProfile } from "../../actions/profileAction";
import { fetchTrips } from "../../actions/tripAction";
import Common from "../../utils/common";
import DayTrip from "../../components/dayTrip/DayTrip";

export class ViewTrip extends Component {
  componentWillUnmount() {
    removeBg("trip-main-bg");
  }

  componentDidMount() {
    document.body.className += " trip-main-bg";
  }
  render() {
    const trip = this.props.trips.trips[this.props.match.params.id];
    if (!trip) {
      this.props.history.push("/");
      return null;
    }
    // TODO: Move to external function
    let attractionLen = trip.places.reduce(
      (attractions, day) => attractions + day.length,
      0
    );

    let calculateDays = Common.date_diff_indays(trip.start_date, trip.end_date);
    return (
      <div className="trip-main-page">
        <div className="header">
          <IonButton
            fill="clear"
            onClick={() => this.props.history.goBack()}
            className="back-btn"
          >
            <IonIcon slot="icon-only" name="arrow-back" />
          </IonButton>
          <p className="trip-name">Trip to {trip.city}</p>
        </div>
        <div className="go-to-map">
          <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
        </div>
        <div className="trip-picture" />
        <div className="trip-info">
          <div className="days-info">
            <p className="number">{calculateDays}</p>
            <p className="days">DAYS</p>
          </div>
          <div className="places-info">
            <p className="number">{attractionLen}</p>
            <p className="places">PLACES</p>
          </div>
          <div className="hotels-info">
            <p className="hotel-icon">
              <FontAwesomeIcon icon={faBed} />
            </p>
            <p className="hotels">HOTELS</p>
          </div>
          <div className="flights-info">
            <p className="plane">
              <FontAwesomeIcon icon={faPlane} />
            </p>
            <p className="flights">FLIGHTS</p>
          </div>
        </div>
        {trip.places.map((day, i) => {
          console.log(day);
          return <DayTrip key={i} attractions={day} day={i} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.token,
  trips: state.trips
});

export default connect(
  mapStateToProps,
  { login, selectProfile, fetchTrips }
)(ViewTrip);
