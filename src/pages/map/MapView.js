import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import "./MapView.scss";

import back from "../assets/left-arrow.png";
import circle from "../assets/circle.png";
import empty from "../assets/empty.png";



export class MapView extends Component { 
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

  render() {
    var points = [
      { lat: 48.877352, lng: 2.296985 },
        { lat: 48.860166, lng: 2.326572},
       { lat: 48.855519, lng: 2.315814},
       { lat: 48.875619, lng: 2.310487},
    ]
    var bounds = new this.props.google.maps.LatLngBounds();
  for (var i = 0; i < points.length; i++) {
    bounds.extend(points[i]);
  }
    return (
      <div class="container">
      <div class="top">
          <div class="back">
              <img src={back}/>
          </div>
          <div class="title">
              Trip map
          </div>
          </div>
          <div id="map">
        <Map className="map-placehplder" google={this.props.google} 
        initialCenter={{
          lat: 48.856613,
          lng: 2.352222
        }}
        bounds={bounds}
        zoom={10}>
   
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
   
          <InfoWindow onClose={this.onInfoWindowClose}>
             
          </InfoWindow>
        </Map>
        <div class="details">
                    <img src={circle}/>
                    <div class="current-location">
                        <span>Current Location</span>
                        <span></span>
                        <span class="kilometers"> km </span>
                    </div>
                    <div class="routes">
                            <img src={empty}/>
                        <div class="route">
                            nextPlace
                        </div>
                    </div>
                    <div class="bth-my-location">Next Location</div>
                </div>
            </div>
        </div>
      );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCzUAH1xG3UbqX8btjKTE80KoOMPgiknzo")
  })(MapView)