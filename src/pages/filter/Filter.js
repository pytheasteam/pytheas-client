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
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";

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
          <IonItem lines="none" className="filter-item">
            <IonLabel position="floating" style={{ display: "block" }}>
              <IonIcon name="pin" slot="start" style={iconStyle} />
              Destination
            </IonLabel>
            <IonInput placeholder="Type a destination" autocomplete={true} />
          </IonItem>
          <IonItem lines="none" className="filter-item">
            <IonLabel position="floating" style={{ display: "block" }}>
              <ion-icon name="calendar" slot="start" style={iconStyle} />
              Dates
            </IonLabel>
            <ion-datetime
              placeholder="start"
              style={{ marginLeft: "10px" }}
              display-format="DD/MM/YYYY"
              picker-format="DD MMMM YYYY"
            />
            <ion-datetime
              placeholder="end"
              style={{ marginLeft: "10px" }}
              display-format="DD/MM/YYYY"
              picker-format="DD MMMM YYYY"
            />
          </IonItem>
          <IonItem lines="none" className="filter-item">
            <IonLabel position="floating" style={{ display: "block" }}>
              <ion-icon name="pricetag" slot="start" style={iconStyle} />
              Price
            </IonLabel>
            <IonInput placeholder="Replace with Range" />
          </IonItem>
          <IonItem lines="none" className="filter-item">
            <IonLabel position="floating" style={{ display: "block" }}>
              <ion-icon name="people" slot="start" style={iconStyle} />
              People
            </IonLabel>
            <IonInput placeholder="Replace with Options" />
          </IonItem>
          <Fab
            variant="extended"
            size="medium"
            style={{
              background: "#ff5347",
              color: "white",
              width: "187px",
              boxShadow: "none",
              margin: "24%"
            }}
            onClick={() => {
              this.props.history.push("/explore");
            }}
            aria-label="Add"
          >
            Explore
          </Fab>
        </div>
      </React.Fragment>
    );
  }
}

export default Filter;
