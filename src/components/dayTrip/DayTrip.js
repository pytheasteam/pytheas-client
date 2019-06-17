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
