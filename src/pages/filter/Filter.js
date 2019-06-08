import React, { Component } from "react";
import {
  IonInput,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonLabel,
  IonItem
} from "@ionic/react";
import "./Filter.css";

const iconStyle = {
  marginRight: "4px",
  position: "relative",
  bottom: "-2px"
};

export class Filter extends Component {
  render() {
    return (
      <React.Fragment>
        <IonToolbar>
          <IonButton
            fill="clear"
            className="back-btn"
            onClick={() => window.history.back()}
          >
            <IonIcon slot="icon-only" name="arrow-back" />
          </IonButton>
          <IonTitle className="title">Filters</IonTitle>
        </IonToolbar>
        <div className="container">
          <IonItem lines="none" className="label">
            <IonLabel position="floating" style={{ display: "block" }}>
              <IonIcon name="pin" slot="start" style={iconStyle} />
              Destination
            </IonLabel>
            <IonInput placeholder="Type a destination" autocomplete={true} />
          </IonItem>
          <IonItem lines="none" className="label">
            <IonLabel position="floating" style={{ display: "block" }}>
              <ion-icon name="calendar" slot="start" style={iconStyle} />
              Dates
            </IonLabel>
            <IonInput placeholder="Type a destination" autocomplete={true} />
          </IonItem>
        </div>
      </React.Fragment>
    );
  }
}

export default Filter;
