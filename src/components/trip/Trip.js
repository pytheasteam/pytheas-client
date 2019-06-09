import React, { Component } from "react";
import { IonItem, IonCard, IonIcon, IonLabel } from "@ionic/react";
import "./Trip.scss";
import { upperFistLetter } from "../../common/styleHelper";

export class Trip extends Component {
  render() {
    return (
      <div className="trip">
        <div className="trip-picture" />
        <p className="city-name">{upperFistLetter(this.props.city)}</p>
        {/* <IonItem lines="none" color="transparent">
          <IonIcon name="pin" slot="start" />
          <IonLabel>{this.props.city}</IonLabel>
        </IonItem> */}
      </div>
    );
  }
}

export default Trip;
