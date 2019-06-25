import React, { Component } from "react";
import "./ViewTrip.scss";
import { removeBg } from "../../common/styleHelper";
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
import Header from "../../components/header/Header";

export class ViewTrip extends Component {
  componentWillUnmount() {
    removeBg("trip-main-bg");
  }

  componentDidMount() {
    document.body.className += " trip-main-bg";
  }

  viewAttraction = (day, attractionId) => {
    this.props.history.push(`/attractions/${day}/${attractionId}`);
  };

  render() {
    const trip =
      this.props.trips.trips &&
      this.props.trips.trips[this.props.match.params.id];
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
    if (isNaN(calculateDays)) {
      calculateDays = trip.days;
    }
    attractionLen -= calculateDays;

    return (
      <div className="trip-main-page">
        <Header
          title={`Trip to ${trip.city || trip.destination}`}
          back={() => {
            window.history.back();
          }}
        />
        <div className="view-trip-header">
          <button
            className="go-to-map"
            onClick={() =>
              this.props.history.push(`/map/${this.props.match.params.id}`)
            }
          >
            <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
          </button>
          <div className="trip-picture" />
          <div className="trip-info">
            <div className="days-info">
              <p className="number">{trip.days || calculateDays}</p>
              <p className="days">DAYS</p>
            </div>
            <div className="places-info">
              <p className="number">{attractionLen}</p>
              <p className="places">PLACES</p>
            </div>
            <div
              className="hotels-info"
              onClick={() => this.props.history.push("/hotels")}
            >
              <p className="hotel-icon">
                <FontAwesomeIcon icon={faBed} />
              </p>
              <p className="hotels">HOTELS</p>
            </div>
            <div
              className="flights-info"
              onClick={() => this.props.history.push("/flights")}
            >
              <p className="plane">
                <FontAwesomeIcon icon={faPlane} />
              </p>
              <p className="flights">FLIGHTS</p>
            </div>
          </div>
        </div>
        <div className="trips-container">
          {trip.places.map((day, i) => {
            if (!day) {
              return null;
            }
            return (
              <DayTrip
                key={i}
                attractions={day}
                day={i}
                viewAttraction={this.viewAttraction}
              />
            );
          })}
        </div>
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
)(ViewTrip);
