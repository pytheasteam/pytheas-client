import React, { Component } from "react";
import { IonItem, IonCard, IonIcon, IonLabel } from "@ionic/react";
import "./Trip.css";

export class Trip extends Component {
  render() {
    return (
      <IonCard>
        <IonItem lines="none" color="transparent">
          <IonIcon name="pin" slot="start" />
          <IonLabel>{this.props.city}</IonLabel>
        </IonItem>
      </IonCard>
    );
  }
}

export default Trip;
