import React, { Component } from "react";
import "./MapAttraction.scss";
import Common from "../../utils/common";

export class MapAttraction extends Component {
  render() {
    const opacity = this.props.current ? 1 : 0.1;
    const setCurrentColor = this.props.current ? "#ff5347" : "#404040";
    return (
      <div className="map-attraction">
        <div className="route-to-next" />
        <div className="attraction-header">
          <div
            className="attraction-img"
            style={{
              background: `url(${this.props.img})  0% 0% / cover`,
              opacity
            }}
          />
          <p className="title" style={{ opacity }}>
            {Common.formatName(this.props.title, 24)}
          </p>
          <p
            className="set-current"
            style={{ color: setCurrentColor }}
            onClick={() => this.props.setCurrent()}
          >
            {this.props.current ? "" : "SET "} CURRENT
          </p>
        </div>

        <p className="address" style={{ opacity }}>
          {this.props.address}
        </p>
      </div>
    );
  }
}

export default MapAttraction;
