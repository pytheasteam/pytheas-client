import React, { Component } from "react";
import "./ViewAttraction.scss";
import { removeBg } from "../../common/styleHelper";
import { IonButton, IonIcon, IonToolbar } from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { selectProfile } from "../../actions/profileAction";
import { fetchTrips } from "../../actions/tripAction";

export class ViewAttraction extends Component {
  componentWillUnmount() {
    removeBg("trip-main-bg");
  }

  componentDidMount() {
    document.body.className += " trip-main-bg";
  }
  render() {
    const attraction =
      this.props.trips.trip.places &&
      this.props.trips.trip.places[this.props.match.params.day][
        this.props.match.params.id
      ];
    if (!attraction) {
      this.props.history.push("/");
      return null;
    }
    return (
      <div className="view-attraction">
        <div className="header">
          <IonToolbar className="toolbar-background">
            <IonButton
              fill="clear"
              onClick={() => {
                window.history.back();
              }}
              className="back-btn"
            >
              <IonIcon slot="icon-only" name="arrow-back" />
            </IonButton>
          </IonToolbar>

          <p className="trip-name">{attraction.name}</p>
        </div>
        <button className="go-to-map">
          <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
        </button>
        <div
          className="trip-picture"
          style={{
            background: `url(${attraction.photo_url ||
              "https://picsum.photos/35"})`,
            backgroundSize: "cover"
          }}
        />
        <div className="description-container">
          <p className="title">Description</p>
          <p className="description">{attraction.description}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.token,
    trips: state.trips
  };
};

export default connect(
  mapStateToProps,
  { login, selectProfile, fetchTrips }
)(ViewAttraction);
