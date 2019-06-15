import React, { Component } from "react";
import { IonButton, IonIcon, IonToolbar } from "@ionic/react";
import "./Flights.scss";
import { removeBg } from "../../common/styleHelper";
import Flight from "../../components/flight/Flight";
import { connect } from "react-redux";

export class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      more: false
    };
  }
  componentWillUnmount() {
    removeBg("flights-bg");
  }

  componentDidMount() {
    document.body.className += " flights-bg";
  }
  render() {
    const allFlights =
      Object.keys(this.props.trips.trip).length > 0 &&
      this.props.trips.trip.explore === true
        ? this.props.trips.trip.flights.map((flight, i) => {
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
              />
            );
          })
        : null;

    const firstFlight = allFlights && allFlights[0];
    return (
      <div className="flights">
        <div className="header">
          <IonToolbar className="toolbar-background">
            <IonButton
              fill="clear"
              className="back-btn"
              onClick={() => window.history.back()}
            >
              <IonIcon slot="icon-only" name="arrow-back" />
            </IonButton>
          </IonToolbar>
          <p className="title">Flights</p>
        </div>
        <div className="flights-container">
          {this.state.more ? allFlights : firstFlight}
        </div>
        {allFlights && allFlights.length > 0 && !this.state.more ? (
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
