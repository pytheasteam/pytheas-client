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
import Geocode from "react-geocode";
import location from "../assets/location.png";
import locationStroke from "../assets/locationStroke.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export class ViewMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {},
      attractions: [],
      currLocation: 0
    };
  }

  componentWillUnmount() {
    removeBg("trip-main-bg");
  }

  componentDidMount() {
    document.body.className += " trip-main-bg";
    const tripId = this.props.match.params.tripId;
    const attractions = this.props.trips.trips[tripId].places[0];
    this.getCoordinatesFromAddress(attractions);
  }

  async calculateCoords(address) {
    Geocode.setApiKey(GOOGLE_API_KEY);
    return await Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        return {
          lat,
          lng
        };
      },
      error => {
        console.error(error);
      }
    );
  }

  async getCoordinatesFromAddress(attractions) {
    const locations = [];
    await attractions.forEach(async attraction => {
      const coord = await this.calculateCoords(attraction.address);
      locations.push(coord);
      this.setState({ attractions: locations, center: locations[0] });
    });
  }

  render() {
    const tripId = this.props.match.params.tripId;
    const trip = this.props.trips.trips[tripId];
    const dayAttractions = trip.places[0];
    if (!trip) {
      window.history.back();
      return null;
    }
    console.log(this.state.center);
    return Object.keys(this.state.center).length !== 0 ? (
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
        <button className="go-to-map">
          <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
        </button>
        <div className="map-view">
          <Map google={this.props.google} zoom={13} center={this.state.center}>
            {this.state.attractions.map((attraction, i) => {
              if (i === this.state.currLocation) {
                return <Marker icon={location} key={i} position={attraction} />;
              }
              return (
                <Marker icon={locationStroke} key={i} position={attraction} />
              );
            })}
          </Map>
        </div>
        <div className="attractions-container">
          {dayAttractions.map((attraction, i) => {
            return (
              <MapAttraction
                key={attraction.name}
                img={attraction.photo_url || "https://picsum.photos/113"}
                address={attraction.address}
                title={attraction.name}
                current={i === this.state.currLocation}
                setCurrent={() =>
                  this.setState({
                    currLocation: i,
                    center: this.state.attractions[i]
                  })
                }
              />
            );
          })}
        </div>
      </div>
    ) : null;
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
