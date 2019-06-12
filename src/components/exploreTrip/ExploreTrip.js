import React, { Component } from "react";
import "./ExploreTrip.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faDollarSign,
  faShekelSign,
  faEuroSign,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";

export class ExploreTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: {
        dollar: <FontAwesomeIcon icon={faDollarSign} />,
        nis: <FontAwesomeIcon icon={faShekelSign} />,
        euro: <FontAwesomeIcon icon={faEuroSign} />
      }
    };
  }
  render() {
    return (
      <div className="explore-trip">
        <div className="picture" />
        <div className="trip-info">
          <p className="trip-name">Trip to city</p>
          <div className="info">
            <div className="days-container">
              <p className="number">12</p>
              <p className="days">DAYS</p>
            </div>
            <div className="attractions-container">
              <p className="location">
                <FontAwesomeIcon
                  className="total-attraction-number"
                  icon={faMapMarkerAlt}
                />
              </p>
              <p className="attraction">40</p>
            </div>
            <div className="price-container">
              <div className="icon">{this.state.currency.nis}</div>
              <div className="price">1200</div>
            </div>
          </div>

          <div className="save">
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </div>
      </div>
    );
  }
}

export default ExploreTrip;
