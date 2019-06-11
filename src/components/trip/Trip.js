import React, { Component } from "react";
import "./Trip.scss";
import { upperFistLetter } from "../../common/styleHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export class Trip extends Component {
  render() {
    let attractionLen = this.props.attractions.reduce(
      (attractions, day) => attractions + day.length,
      0
    );
    let days = "3";
    return (
      <div className="trip" onClick={() => this.props.viewTrip()}>
        <div className="trip-picture" />
        <div className="trip-content">
          <p className="city-name">{upperFistLetter(this.props.city)}</p>
          <div className="total-attractions">
            <p className="total-attraction-days">{attractionLen}</p>
            <FontAwesomeIcon
              className="total-attraction-number"
              icon={faMapMarkerAlt}
            />
          </div>
          <div className="total-days">
            <p className="total-days-number">
              {days}
              <span className="total-days-days"> DAYS</span>
            </p>
          </div>
        </div>

        <div className="trip-devider" />
        <div className="trip-date">
          <p className="day">{this.props.day || "07"}</p>
          <p className="month">{this.props.day || "JUN"}</p>
        </div>
      </div>
    );
  }
}

export default Trip;
