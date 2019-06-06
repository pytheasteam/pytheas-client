import React, { Component } from "react";
import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { API_BASE } from "../../api/consts";

export class Explore extends Component {
  componentWillMount() {}
  render() {
    return (
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hello from Explore</IonTitle>
        </IonToolbar>
      </IonHeader>
    );
  }
}

export default Explore;
