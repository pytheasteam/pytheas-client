import React, { Component } from "react";
import "./Flights.scss";
import { removeBg } from "../../common/styleHelper";
import Flight from "../../components/flight/Flight";
import { connect } from "react-redux";
import Header from "../../components/header/Header";
import Loader from "../../components/loader/Loader";

export class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      more: false,
      loader: false
    };

    this.toggleLoader = this.toggleLoader.bind(this);
  }
  componentWillUnmount() {
    removeBg("flights-bg");
  }

  componentDidMount() {
    document.body.className += " flights-bg";
  }

  getFlights() {
    const rsrv = this.props.trips.trip.flight_rsrv;
    if (rsrv && rsrv !== "" && Object.keys(rsrv).length > 0) {
      return [
        <Flight
          destination={rsrv.to_city}
          destinationCode={rsrv.to_city_code}
          from={rsrv.from_city}
          fromCode={rsrv.from_city_code}
          arrivalTime={rsrv.arrival_time}
          departureTime={rsrv.departure_time}
          duration={rsrv.duration}
          price={rsrv.price}
          toggleLoader={() => this.toggleLoader()}
          reservationNumber={rsrv.reservation_number}
        />
      ];
    }

    if (Object.keys(this.props.trips.trip).length > 0) {
      return this.props.trips.trip.flights.map((flight, i) => {
        return (
          <Flight
            key={i}
            destination={flight.to_city}
            destinationCode={flight.to_city_code}
            from={flight.from_city}
            fromCode={flight.from_city_code}
            arrivalTime={flight.arrival_time}
            link={flight.link}
            departureTime={flight.departure_time}
            duration={flight.duration}
            price={flight.price}
            toggleLoader={() => this.toggleLoader()}
          />
        );
      });
    }
    return null;
  }

  toggleLoader() {
    this.setState({ loader: !this.state.loader });
  }

  render() {
    if (this.state.loader) {
      return <Loader />;
    }
    const allFlights = this.getFlights();
    const firstFlight = allFlights && allFlights[0];
    return (
      <div className="flights">
        <Header title="Flights" back={() => window.history.back()} />
        <div className="flights-container">
          {this.state.more ? allFlights : firstFlight}
        </div>
        {allFlights && allFlights.length > 1 && !this.state.more ? (
          <div
            className="more-flights"
            onClick={() => this.setState({ more: true })}
          >
            <p>More Flights</p>
          </div>
        ) : null}
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
  {}
)(Flights);
