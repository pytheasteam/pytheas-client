import React, { Component } from "react";
import "./MapView.scss";
import { TRIP_MOCK } from "../../mock/tripMock";
import back from "../assets/left-arrow.png";
import circle from "../assets/circle.png";
import empty from "../assets/empty.png";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SavedTrips: []
    };
  }

  componentDidMount() {
    this.setState({ trips: TRIP_MOCK });
    this.renderMap()

  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCzUAH1xG3UbqX8btjKTE80KoOMPgiknzo&callback=initMap")
    window.initMap = this.initMap;
  }

  initMap = () => {
    var markers = [
      { lat: 48.877352, lng: 2.296985 },
      { lat: 48.860166, lng: 2.326572 },
      { lat: 48.855519, lng: 2.315814 },
      { lat: 48.875619, lng: 2.310487 },
    ]

    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 48.856613, lng: 2.296985 },
      zoom: 12
    });
    for (var i = 0; i < markers.length; i++) {
      var marker = new window.google.maps.Marker({ position: markers[i], map: map });
    }
  }


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
            <span className="route">Avalon Hotel Paris Gare du Nord</span>
            <span className="kilometers"> km </span>
          </div>
          <div className="routes">
            {this.state.trips[0].places.map(place => {
              return (
                place.map(
                  item => {
                    return (

                      <div className="place"> 
                        <img src={empty}/>
                        <span className="marker">{item.name}</span>
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

export default MapView;