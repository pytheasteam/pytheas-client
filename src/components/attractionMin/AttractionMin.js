import React, { Component } from "react";
import { IonIcon } from "@ionic/react";
import "./AtrractionMin.scss";
import { upperFistLetter, tagIcons } from "../../common/styleHelper";

export class AttractionMin extends Component {
  render() {
    return (
      <div className="trip">
        <div className="trip-picture" />
        <p className="city-name">{upperFistLetter(this.props.city)}</p>
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
