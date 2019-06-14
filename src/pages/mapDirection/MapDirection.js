import React, { Component } from "react";
import "./MapDirection.scss";
import  { compose, withProps, lifecycle } from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer} from 'react-google-maps'
import { TRIP_MOCK } from "../../mock/tripMock";
import back from "../assets/left-arrow.png";
import circle from "../assets/circle.png";
import empty from "../assets/empty.png";

export class MapDirecion extends Component {
  markers = [
    { lat: 48.877352, lng: 2.296985 },
    { lat: 48.860166, lng: 2.326572 },
    { lat: 48.855519, lng: 2.315814 },
    { lat: 48.875619, lng: 2.310487 },
  ]
  constructor(props){
    super(props)
    this.state = {
            SavedTrips: [],
          }
  }

  componentDidMount() {
    this.setState({ trips: TRIP_MOCK });
    // this.renderMap()

  }
render() {
  console.log(this.props.location.state.markers);
  const DirectionsComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCzUAH1xG3UbqX8btjKTE80KoOMPgiknzo",
       loadingElement: <div style={{ height: `400px` }} />,
      containerElement: <div style={{ width: `100%` }} />,
      mapElement: <div style={{height: `92vh`, width: `100vw`, marginTop: '15%', position: 'absolute', overflow:'hidden' }}  />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
      componentDidMount() { 
        // var map = new window.google.maps.Map(document.getElementById('map'), {
        //   center:  {lat :48.877352, lng: 2.296985},
        //   zoom: 12
          
        // });
        // for (var i = 0; i < this.markers.length; i++) {
        //   var marker = new window.google.maps.Marker({ position: this.markers[i], map: map });
        // }
        const DirectionsService = new window.google.maps.DirectionsService();
        DirectionsService.route({
          origin: new window.google.maps.LatLng(48.881086, 2.351514),
          destination: new window.google.maps.LatLng(48.877352, 2.296985),
          travelMode: window.google.maps.TravelMode.WALKING,
        }, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
this.setState({
              directions: {...result},
              markers: true
            })
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      }
    })
  )(props =>
    this.state.trips ? (
      <div className="container">
        <div className="top">
          <div className="back">
            <img src={back} />
          </div>
          <div className="title">
            Trip map
          </div>
        </div>
        <div className="map-placeholder">
        <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 48.877352, lng: 2.296985}}
      >
        {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers}/>}
      </GoogleMap>
         </div>
        <div className="details">
          <img src={circle} />
          <div className="current-location">
            <span >Current Location</span>
            <span className="route">{this.addressCenter}</span>
            <span className="kilometers"> km </span>
          </div>
          <div className="routes">
          {this.state.trips[0].places.map(place => { 
              return (
                place.map(
                  (item,index) => {
                    return (

                      <div className="place"> 
                        <img src={empty}/>
                        <span className="marker">{item.name}</span><span  className="set-loaction">Set location</span>
                        <div className="route">
                          {item.address}
                          <span className="kilometers"> km </span>
                        </div>
                      </div>
                    );

                  })
              );
            })

            }
            <div className="bth-my-location">Next Location</div>
          </div>
        </div>
      </div>
    ) : null
  );
return (
      <DirectionsComponent
      />
  )
}
} 
 export default MapDirecion;