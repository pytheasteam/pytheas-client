import React, { Component } from "react";
import { removeBg } from "../../common/styleHelper";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { selectProfile } from "../../actions/profileAction";
import {
  fetchTrips,
  selectTrip,
  fetchExplore,
  updateTrip
} from "../../actions/tripAction";
import "./Hotels.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/header/Header";
import PytheasApi from "../../api/Api";
import Loader from "../../components/loader/Loader";

export class Hotels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationMode: false,
      confirmationNumber: "",
      loader: false
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
    this.setState({ confirmationNumber: e.target.value });
  };

  async confirm() {
    const body = this.props.trips.trip;
    body.hotel_rsrv_code = this.state.confirmationNumber;
    body.profile = this.props.profile.id;
    PytheasApi.put("/trip", body).then(trip => {
      this.props.updateTrip(trip) && this.setState({ loader: false });
    });
    this.setState({ loader: true });
  }

  getBookingStatus() {
    const trip = this.props.trips ? this.props.trips.trip : {};
    if (trip === {}) {
      return null;
    }
    const confirmationNumber = trip.hotel_rsrv_code;
    if (confirmationNumber) {
      return (
        <div className="book">
          <p>{confirmationNumber}</p>
        </div>
      );
    }
    return this.state.reservationMode ? (
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
    ) : (
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
    );
  }

  getHotel() {
    const trip = this.props.trips ? this.props.trips.trip : {};
    if (trip === {}) {
      return null;
    }
    return (
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
    );
  }

  render() {
    if (this.state.loader) return <Loader />;
    const hotel = this.getHotel();
    const booking = this.getBookingStatus();
    if (!hotel || !booking) {
      return null;
    }
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
    explore: state.explore,
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  {
    login,
    selectProfile,
    fetchTrips,
    selectTrip,
    fetchExplore,
    updateTrip
  }
)(Hotels);
