import React, { Component } from "react";
import { IonIcon } from "@ionic/react";
import "./Trip.scss";
import { upperFistLetter, tagIcons } from "../../common/styleHelper";

export class Trip extends Component {
  render() {
    return (
      <div className="trip">
        <div className="trip-picture" />
        <p className="city-name">{upperFistLetter(this.props.city)}</p>
        <IonIcon className="tag-icon" name={tagIcons.music} />
        <IonIcon className="tag-icon" name={tagIcons.test2} />
        <IonIcon className="tag-icon" name={tagIcons.test3} />
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
