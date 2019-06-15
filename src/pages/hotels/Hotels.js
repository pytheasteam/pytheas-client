import React, { Component } from "react";
import { removeBg } from "../../common/styleHelper";
import { IonButton, IonIcon, IonToolbar } from "@ionic/react";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { selectProfile } from "../../actions/profileAction";
import { fetchTrips, selectTrip, fetchExplore } from "../../actions/tripAction";
import "./Hotels.scss";
import ExploreTrip from "../../components/exploreTrip/ExploreTrip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export class Hotels extends Component {
  componentWillUnmount() {
    removeBg("hotels-bg");
  }

  componentDidMount() {
    document.body.className += " hotels-bg";
  }

  render() {
    return (
      <div className="hotels">
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
          <p className="title">Hotels</p>
        </div>
        <div className="hotel-picture" />
        <div className="hotel-name">
          <p className="name">{"Hotel name"}</p>
          <p className="hotel-address">Somewere over the rainbow</p>
        </div>
        <div className="hotel-info">
          <div className="price-container">
            <p className="price-title">Price</p>
            <p className="price">500$</p>
          </div>
          <div className="rate-container">
            <p className="rate">Rate</p>
            <div className="stars">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
          </div>
          <div className="details-container">
            <p className="detail-title" />
          </div>
        </div>
        <div className="book">
          <p>Book</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.token,
    trips: state.trips,
    explore: state.explore
  };
};

export default connect(
  mapStateToProps,
  {
    login,
    selectProfile,
    fetchTrips,
    selectTrip,
    fetchExplore
  }
)(Hotels);
