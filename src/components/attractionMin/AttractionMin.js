import React, { Component } from "react";
import { IonIcon } from "@ionic/react";
import "./AtrractionMin.scss";
import { upperFistLetter } from "../../common/styleHelper";
import Common from "../../utils/common";

export class AttractionMin extends Component {
  render() {
    const attractionName = upperFistLetter(this.props.city);
    return (
      <div
        className="attraction-min"
        onClick={() =>
          this.props.viewAttraction(this.props.day, this.props.attractionId)
        }
      >
        <div
          className="trip-picture"
          style={{
            background: `url(${this.props.img || "https://picsum.photos/35"})`,
            backgroundSize: "cover"
          }}
        />
        <p aria-labelledby={attractionName} className="city-name">
          {Common.formatName(attractionName, 20)}
        </p>
        <div className="trip-devider" />
        <IonIcon className="rate-trip" name="star" />
      </div>
    );
  }
}

export default AttractionMin;
