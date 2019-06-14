import React, { Component } from "react";
import { IonButton, IonIcon, IonToolbar } from "@ionic/react";
import "./Flights.scss";
import { removeBg } from "../../common/styleHelper";
import Flight from "../../components/flight/Flight";

export class Flights extends Component {
  componentWillUnmount() {
    removeBg("flights-bg");
  }

  componentDidMount() {
    document.body.className += " flights-bg";
  }
  render() {
    return (
      <div className="flights">
        <div className="header">
          <IonToolbar className="toolbar-background">
            <IonButton
              fill="clear"
              className="back-btn"
              onClick={() => window.history.back()}
            >
              <IonIcon slot="icon-only" name="arrow-back" />
            </IonButton>
          </IonToolbar>
          <p className="title">Flights</p>
        </div>
        <Flight />
      </div>
    );
  }
}

export default Flights;
