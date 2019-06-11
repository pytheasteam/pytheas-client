import React, { Component } from "react";
import { IonIcon } from "@ionic/react";
import "./AtrractionMin.scss";
import { upperFistLetter, tagIcons } from "../../common/styleHelper";
const maxlimit = 13;

export class AttractionMin extends Component {
  formatName(attractionName) {
    return attractionName.length > maxlimit
      ? attractionName.substring(0, maxlimit - 3) + "..."
      : attractionName;
  }

  render() {
    const attractionName = upperFistLetter(this.props.city);
    return (
      <div className="trip">
        <div className="trip-picture" />
        <p aria-labelledby={attractionName} className="city-name">
          {this.formatName(attractionName)}
        </p>
        <IonIcon className="tag-icon" name={tagIcons.music} />
        <IonIcon className="tag-icon" name={tagIcons.test2} />
        <IonIcon className="tag-icon" name={tagIcons.test3} />
        <div className="trip-devider" />
        <IonIcon className="rate-trip" name="star" />
      </div>
    );
  }
}

export default AttractionMin;
