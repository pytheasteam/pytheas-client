import React, { Component } from "react";
import "./DayTrip.scss";
import AttractionMin from "../attractionMin/AttractionMin";
import Common from "../../utils/common";

export class DayTrip extends Component {
  render() {
    return (
      <div className="day-trip">
        <p className="day-info">DAY {this.props.day + 1}</p>
        {this.props.attractions.map((attraction, i) => {
          if (Common.isObjectEmpty(attraction) || i === 0) {
            return null;
          }
          return (
            <AttractionMin
              className="attraction"
              key={i}
              day={this.props.day}
              attractionId={i}
              viewAttraction={this.props.viewAttraction}
              city={attraction.name}
              img={attraction.photo_url}
            />
          );
        })}
      </div>
    );
  }
}

export default DayTrip;
