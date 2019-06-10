import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapView extends Component { 

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
        <Map google={this.props.google} 
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
      );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCzUAH1xG3UbqX8btjKTE80KoOMPgiknzo")
  })(MapView)