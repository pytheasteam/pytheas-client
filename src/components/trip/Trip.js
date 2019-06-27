import React, { Component } from "react";
import "./Trip.scss";
import { upperFistLetter } from "../../common/styleHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Common from "../../utils/common";

export class Trip extends Component {
  render() {
    const days = Common.date_diff_indays(
      this.props.startDate,
      this.props.endDate
    );

    let attractionLen = this.props.attractions.reduce(
      (attractions, day) => attractions + day.length,
      0
    );

    attractionLen -= days;

    const startDate = new Date(this.props.startDate);
    let startDayDay = startDate.getDate();
    if (startDayDay < 10) {
      startDayDay = `0${startDayDay.toString()}`;
    }
    const startDayMonth = Common.getMonthName(startDate.getMonth());
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
          <p className="day">{startDayDay}</p>
          <p className="month">{startDayMonth}</p>
        </div>
      </div>
    );
  }
}

export default Trip;
