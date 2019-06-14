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
        USD: <FontAwesomeIcon icon={faDollarSign} />,
        nis: <FontAwesomeIcon icon={faShekelSign} />,
        euro: <FontAwesomeIcon icon={faEuroSign} />
      }
    };
  }
  render() {
    console.log(this.props.attractions);
    let attractionLen = this.props.attractions.reduce(
      (attractions, day) => attractions + day.length,
      0
    );
    return (
      <div className="explore-trip" onClick={() => this.props.viewTrip()}>
        <div className="picture" />
        <div className="trip-info">
          <p className="trip-name">Trip to {this.props.city}</p>
          <div className="info">
            <div className="days-container">
              <p className="number">{this.props.days}</p>
              <p className="days">DAYS</p>
            </div>
            <div className="attractions-container">
              <p className="location">
                <FontAwesomeIcon
                  className="total-attraction-number"
                  icon={faMapMarkerAlt}
                />
              </p>
              <p className="attraction">{attractionLen}</p>
            </div>
            <div className="price-container">
              <div className="icon">
                {this.state.currency[this.props.currency]}
              </div>
              <div className="price">{this.props.price}</div>
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
