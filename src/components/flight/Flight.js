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
          <div className="departure">
            <div className="icon-departure">
              <FontAwesomeIcon icon={faPlaneDeparture} />
            </div>
            <p className="departure-name">Departure</p>
            <p className="at">
              At <span className="time">7:00</span>
            </p>
          </div>
          <div className="arrival">
            <div className="icon-arrival">
              <FontAwesomeIcon icon={faPlaneArrival} />
            </div>
            <p className="arrival-name">Arrival</p>
            <p className="at">
              At <span className="time">7:00</span>
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
              <p className="city-id">NYC</p>
              <p className="city-name">New York</p>
            </div>
            <div className="destination-to">
              <p className="city-id">SFO</p>
              <p className="city-name">San Francisco</p>
            </div>
          </div>
          {this.state.reservationMode ? reservation : orderTicket}
        </div>
      </div>
    );
  }
}

export default Flight;
