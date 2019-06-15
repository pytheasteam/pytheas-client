import React, { Component } from "react";
import "./Flight.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneArrival,
  faPlaneDeparture
} from "@fortawesome/free-solid-svg-icons";

export class Flight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationMode: false,
      confirmationNumber: ""
    };
  }
  getReservation = () => {
    this.setState({ reservationMode: true });
  };

  handleChange = e => {
    this.setState({ confirmationNumber: e.target.value });
  };

  render() {
    const orderTicket = (
      <div className="order-ticket">
        <div className="price">
          <p className="price-header">Price</p>
          <p className="price-content">{this.props.price}€</p>
        </div>
        <div className="order">
          <p className="order-text">
            <a
              href={this.props.link}
              onClick={this.getReservation}
              target="_blank"
            >
              ORDER
            </a>
          </p>
        </div>
      </div>
    );
    const reservation = (
      <div className="reservation">
        <input
          type="text"
          placeholder="Enter reservation number"
          name="reservation"
          className="reservation-number"
        />
        <div className="confirm">
          <p className="confirm-text">Confirm</p>
        </div>
      </div>
    );
    return (
      <div className="flight">
        <div className="time-info-container">
          <div className="devider" />
          <div className="departure">
            <div className="icon-departure">
              <FontAwesomeIcon icon={faPlaneDeparture} />
            </div>
            <p className="departure-name">Departure</p>
            <p className="at">
              At <span className="time">{this.props.departureTime}</span>
            </p>
          </div>
          <div className="arrival">
            <div className="icon-arrival">
              <FontAwesomeIcon icon={faPlaneArrival} />
            </div>
            <p className="arrival-name">Arrival</p>
            <p className="at">
              At <span className="time">{this.props.arrivalTime}</span>
            </p>
          </div>
          <div className="flight-time">
            <p className="flight-time-title">Flight Time</p>
            <p className="hours">{this.props.duration}</p>
          </div>
        </div>
        <div className="flight-info-container">
          <div className="destination">
            <div className="destination-from">
              <p className="city-id">{this.props.fromCode}</p>
              <p className="city-name">{this.props.from}</p>
            </div>
            <div className="destination-to">
              <p className="city-id">{this.props.destinationCode}</p>
              <p className="city-name">{this.props.destination}</p>
            </div>
          </div>
          {this.state.reservationMode ? reservation : orderTicket}
        </div>
      </div>
    );
  }
}

export default Flight;
