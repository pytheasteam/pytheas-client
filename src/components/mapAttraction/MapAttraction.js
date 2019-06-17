import React, { Component } from "react";
import "./MapAttraction.scss";

export class MapAttraction extends Component {
  render() {
    return (
      <div className="map-attraction">
        <div className="attraction-header">
          <div
            className="attraction-img"
            style={{ background: `url(${this.props.img})` }}
          />
          <p className="title">{this.props.title}</p>
        </div>

        <p className="address">{this.props.address}</p>
      </div>
    );
  }
}

export default MapAttraction;
