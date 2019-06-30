/* global google */

import React, { Component } from "react";
import "./ViewMap.scss";
import { removeBg } from "../../common/styleHelper";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { selectProfile } from "../../actions/profileAction";
import { fetchTrips } from "../../actions/tripAction";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import MapAttraction from "../../components/mapAttraction/MapAttraction";
import Geocode from "react-geocode";
import location from "../assets/location.png";
import locationStroke from "../assets/locationStroke.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import Header from "../../components/header/Header";
import Loader from "../../components/loader/Loader";

export class ViewMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {},
      attractions: [],
      currLocation: 0,
      map: null,
      showDirection: true
    };

    this.handleMapReady = this.handleMapReady.bind(this);
  }

  componentWillUnmount() {
    removeBg("trip-main-bg");
  }

  componentDidMount() {
    document.body.className += " trip-main-bg";
    const tripId = this.props.match.params.tripId;
    if (!this.props.trips.trips || !this.props.trips.trips[tripId]) {
      window.history.back();
      return null;
    }
    const attractions = this.props.trips.trips[tripId].places[0];
    this.getCoordinatesFromAddress(attractions);
  }

  handleMapReady(mapProps, map) {
    if (!this.state.map) this.setState({ map });
  }

  showDirections() {
    if (this.state.map === null || !this.state.showDirection) {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: "#ff5347"
      },
      suppressMarkers: true
    });
    directionsDisplay.setMap(this.state.map);
    const attractions = _.cloneDeep(this.state.attractions);
    let waypoints = attractions.map(attraction => {
      if (!attraction || !attraction.lat || !attraction.lng) {
        return null;
      }
      return {
        location: { lat: attraction.lat, lng: attraction.lng },
        stopover: true
      };
    });
    waypoints = waypoints.filter(point => !!point);
    if (!waypoints) {
      this.setState({ showDirection: false });
    }
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: "WALKING"
      },
      (response, status) => {
        if (status === "OK") {
          directionsDisplay.setDirections(response);
        } else {
          console.log("Directions request failed due to " + status);
        }
      }
    );
    this.setState({ showDirection: false });
  }

  async calculateCoords(address) {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
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

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getCoordinatesFromAddress(attractions) {
    const locations = [];
    for (let attraction of attractions) {
      const coord = await this.calculateCoords(attraction.address);
      locations.push(coord);
    }
    this.setState({ attractions: locations, center: locations[0] });
  }

  initMapAttractions(dayAttractions) {
    return dayAttractions.map((attraction, i) => {
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
    });
  }

  initMarkersFromAttractions(attractions) {
    return attractions.map((attraction, i) => {
      if (i === this.state.currLocation) {
        return <Marker icon={location} key={i} position={attraction} />;
      }
      return <Marker icon={locationStroke} key={i} position={attraction} />;
    });
  }

  initTrip() {
    const tripId = this.props.match.params.tripId;
    return this.props.trips.trips && this.props.trips.trips[tripId];
  }

  render() {
    const trip = this.initTrip();
    if (!trip || !this.state.center) {
      window.history.back();
      return null;
    }
    const dayAttractions = trip.places[0];
    const mapAttractions = this.initMapAttractions(dayAttractions);
    const markers = this.initMarkersFromAttractions(this.state.attractions);

    this.showDirections();

    return Object.keys(this.state.center).length !== 0 ? (
      <div className="view-map">
        <Header
          title={`Trip to ${trip.city || trip.destination}`}
          back={() => {
            window.history.back();
          }}
        />

        <button className="go-to-map">
          <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
        </button>
        <div className="map-view">
          <Map
            google={this.props.google}
            center={this.state.center}
            onReady={this.handleMapReady}
          >
            {markers}
          </Map>
        </div>
        <div className="attractions-container">{mapAttractions}</div>
      </div>
    ) : (
      <Loader />
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
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(ViewMap);

export default connect(
  mapStateToProps,
  { login, selectProfile, fetchTrips }
)(WrappedWithGoogleApi);
