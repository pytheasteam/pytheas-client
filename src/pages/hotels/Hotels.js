import React, { Component } from "react";
import { removeBg } from "../../common/styleHelper";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { selectProfile } from "../../actions/profileAction";
import { fetchTrips, selectTrip, fetchExplore } from "../../actions/tripAction";
import "./Hotels.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/header/Header";
import PytheasApi from "../../api/Api";

export class Hotels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationMode: false,
      confirmationNumber: ""
    };

    this.confirm = this.confirm.bind(this);
  }
  componentWillUnmount() {
    removeBg("hotels-bg");
  }

  componentDidMount() {
    document.body.className += " hotels-bg";
  }

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ confirmationNumber: e.target.value });
  };

  async confirm() {
    const body = {
      profile: this.props.profile.id,
      hotel_rsrv: "",
      trip: this.props.trips.trip
    };
    const status = await PytheasApi.put("/trip", body);
  }

  render() {
    const trip = this.props.trips ? this.props.trips.trip : {};
    const validExploreTrip =
      Object.keys(trip).length > 0 && trip.explore === true;
    const hotel = validExploreTrip ? (
      <React.Fragment>
        <div
          className="hotel-picture"
          style={{ background: `url(${trip.hotel.main_photo_url})` }}
        />
        <div className="hotel-name">
          <p className="name">{trip.hotel.name}</p>
          <p className="hotel-address">{trip.hotel.address}</p>
        </div>
        <div className="hotel-info">
          <div className="price-container">
            <p className="price-title">Price</p>
            <p className="price">{trip.hotel.price_per_night}$</p>
          </div>
          <div className="rate-container">
            <p className="rate">Rate</p>
            <div className="stars">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
          </div>
          <div className="details-container">
            <p className="detail-title" />
          </div>
        </div>
      </React.Fragment>
    ) : null;

    const booking = this.state.reservationMode ? (
      <div className="reservation">
        <input
          type="text"
          placeholder="Enter reservation number"
          name="reservation"
          onChange={this.handleChange}
          className="reservation-number"
        />
        <div className="confirm" onClick={() => this.confirm()}>
          <p className="confirm-text">Confirm</p>
        </div>
      </div>
    ) : validExploreTrip ? (
      <a
        href={trip.hotel.url}
        onClick={() => this.setState({ reservationMode: true })}
        target="_blank"
        rel="noopener noreferrer"
        className="book-url"
      >
        <div className="book">
          <p>Book</p>
        </div>
      </a>
    ) : null;

    return (
      <div className="hotels">
        <Header title="Hotel" back={() => window.history.back()} />
        <div className="hotels-container">{hotel}</div>
        {booking}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.token,
    trips: state.trips,
    explore: state.explore
  };
};

export default connect(
  mapStateToProps,
  {
    login,
    selectProfile,
    fetchTrips,
    selectTrip,
    fetchExplore
  }
)(Hotels);
