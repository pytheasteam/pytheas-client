import React, { Component } from "react";
import "./MapView.scss";
import { TRIP_MOCK } from "../../mock/tripMock";
import back from "../assets/left-arrow.png";
import circle from "../assets/circle.png";
import empty from "../assets/empty.png";
import { withRouter } from 'react-router-dom';

export class MapView extends Component {
 
  addressCenter=""
  constructor(props) {
    super(props);
this.markers=[];
    this.state = {
      SavedTrips: [],
    }
  }
  

  componentDidMount() {
    this.setState({ trips: TRIP_MOCK });
    this.renderMap()

  }
  setPath(item,i){
    this.markers = [
      { lat: 48.877352, lng: 2.296985 },
      { lat: 48.860166, lng: 2.326572 },
      { lat: 48.855519, lng: 2.315814 },
      { lat: 48.875619, lng: 2.310487 },
    ];
   const currentPostion={
     lat:48.881086,
     lng: 2.351514
   }
   const markerNext = this.markers[i];
    this.markers.splice(i, 1);
    setTimeout(() => this.props.history.push({ pathname: '/path', state: { markers: this.markers } }), 0);
    // return(
    // <Redirect to={{ pathname: '/path', state: { currentPostion: currentPostion, markerNext: markerNext, markers: this.markers} }} />
    // )
  }
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCzUAH1xG3UbqX8btjKTE80KoOMPgiknzo&callback=initMap")
    window.initMap = this.initMap;
  }
  initMap () {
    this.markers = [
      { lat: 48.877352, lng: 2.296985 },
      { lat: 48.860166, lng: 2.326572 },
      { lat: 48.855519, lng: 2.315814 },
      { lat: 48.875619, lng: 2.310487 },
    ]
    this.addressCenter="Avalon Hotel Paris Gare du Nord";
     var map = new window.google.maps.Map(document.getElementById('map'), {
       center:  {lat :48.877352, lng: 2.296985 },
       zoom: 12
       
     });
     for (var i = 0; i < this.markers.length; i++) {
       var marker = new window.google.maps.Marker({ position: this.markers[i], map: map });
     }
   }
  // getKilometers(origin, destination){
  //   var o = new google.maps.LatLng(origin);
  //   var d =  new google.maps.LatLng(destination);
  //   this.kilometers = (google.maps.geometry.spherical.computeDistanceBetween(o, d)/ 1000).toFixed(2);
  // }  


  render() {
    return this.state.trips ? (
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
          <div id="map">

          </div>
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
                        <span className="marker">{item.name}</span><span onClick={this.setPath.bind(item,index)} className="set-loaction">Set location</span>
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
    ) : null;
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)

}

export default withRouter(MapView);