import React, { Component } from "react";
import "./ViewTrip.scss";
import { removeBg } from "../../common/styleHelper";
import { IonButton, IonIcon } from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faBed } from "@fortawesome/free-solid-svg-icons";
export class ViewTrip extends Component {
  componentWillUnmount() {
    removeBg("trip-main-bg");
  }

  componentDidMount() {
    document.body.className += " trip-main-bg";
  }
  render() {
    return (
      <div className="trip-main-page">
        <div className="header">
          <IonButton
            fill="clear"
            onClick={() => window.history.back()}
            className="back-btn"
          >
            <IonIcon slot="icon-only" name="arrow-back" />
          </IonButton>
          <p className="trip-name">Trip to 'city'</p>
        </div>
        <div className="trip-picture" />
        <div className="trip-info">
          <div className="days-info">
            <p className="number">11</p>
            <p className="days">DAYS</p>
          </div>
          <div className="places-info">
            <p className="number">40</p>
            <p className="places">PLACES</p>
          </div>
          <div className="hotels-info">
            <p className="hotel-icon">
              <FontAwesomeIcon icon={faBed} />
            </p>
            <p className="hotels">HOTELS</p>
          </div>
          <div className="flights-info">
            <p className="plane">
              <FontAwesomeIcon icon={faPlane} />
            </p>
            <p className="flights">FLIGHTS</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewTrip;
