import React, { Component } from "react";
import { removeBg } from "../../common/styleHelper";
import { IonButton, IonIcon, IonToolbar } from "@ionic/react";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { selectProfile } from "../../actions/profileAction";
import { fetchTrips } from "../../actions/tripAction";
import "./Explore.scss";
import ExploreTrip from "../../components/exploreTrip/ExploreTrip";
import PytheasApi from "../../api/Api";

export class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    };
  }
  componentWillUnmount() {
    removeBg("explore-bg");
  }

  componentDidMount() {
    document.body.className += " explore-bg";
    const queryString = this.props.location.search;
    PytheasApi.get("/explore", queryString).then(trips =>
      this.setState({ trips })
    );
  }

  render() {
    return (
      <div className="explore">
        <div className="header">
          <IonToolbar className="toolbar-background">
            <IonButton
              fill="clear"
              className="back-btn"
              onClick={() => this.props.history.push("/")}
            >
              <IonIcon slot="icon-only" name="arrow-back" />
            </IonButton>
          </IonToolbar>
          <p className="title">Explore</p>
        </div>{" "}
        {this.state.trips.map((trip, i) => {
          return (
            <ExploreTrip
              key={i}
              city={trip.destination}
              price={trip.price}
              currency={trip.currency}
              days={trip.days}
              attractions={trip.places}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.token,
    trips: state.trips
  };
};

export default connect(
  mapStateToProps,
  { login, selectProfile, fetchTrips }
)(Explore);
