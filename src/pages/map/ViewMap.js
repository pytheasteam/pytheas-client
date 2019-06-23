import React, { Component } from "react";
import "./ViewMap.scss";
import { removeBg } from "../../common/styleHelper";
import { IonButton, IonIcon, IonToolbar } from "@ionic/react";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { selectProfile } from "../../actions/profileAction";
import { fetchTrips } from "../../actions/tripAction";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import MapAttraction from "../../components/mapAttraction/MapAttraction";
import { GOOGLE_API_KEY } from "../../consts";

export class ViewMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  componentWillUnmount() {
    removeBg("trip-main-bg");
  }

  componentDidMount() {
    document.body.className += " trip-main-bg";
  }

  getCoordinatesFromAddress() {}

  render() {
    const trip = this.props.trips.trips[this.props.match.params.tripId];
    const dayAttractions = trip.places[0];
    if (!trip) {
      window.history.back();
      return null;
    }
    return (
      <div className="view-map">
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

          <p className="trip-name">Trip to {trip.city}</p>
        </div>
        {/* <button className="go-to-map">
          <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
        </button> */}
        <div className="map-view">
          <Map
            google={this.props.google}
            zoom={8}
            initialCenter={{ lat: 47.444, lng: -122.176 }}
          >
            <Marker position={{ lat: 48.0, lng: -122.0 }} />
          </Map>
        </div>
        <div className="attractions-container">
          {dayAttractions.map(attraction => {
            return (
              <MapAttraction
                key={attraction.name}
                img={attraction.photo_url || "https://picsum.photos/113"}
                address={attraction.address}
                title={attraction.name}
              />
            );
          })}
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

const WrappedWithGoogleApi = GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(ViewMap);

export default connect(
  mapStateToProps,
  { login, selectProfile, fetchTrips }
)(WrappedWithGoogleApi);
