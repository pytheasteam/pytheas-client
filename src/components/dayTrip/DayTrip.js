import React, { Component } from "react";
import "./DayTrip.scss";
import AttractionMin from "../attractionMin/AttractionMin";

export class DayTrip extends Component {
  render() {
    return (
      <div className="day-trip">
        <p className="day-info">DAY {this.props.day + 1}</p>
        {this.props.attractions.map((attraction, i) => {
          return (
            <AttractionMin
              className="attraction"
              key={i}
              city={attraction.name}
            />
          );
        })}
      </div>
    );
  }
}

export default DayTrip;
