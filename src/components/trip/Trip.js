import React, { Component } from "react";
import { IonItem, IonCard, IonIcon, IonLabel } from "@ionic/react";

export class Trip extends Component {
  render() {
    return (
      <IonCard>
        <IonItem lines="none">
          <IonIcon name="pin" slot="start" />
          <IonLabel>{this.props.city}</IonLabel>
        </IonItem>
      </IonCard>
    );
  }
}

export default Trip;
