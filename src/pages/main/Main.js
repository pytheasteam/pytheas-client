import React, { Component } from "react";
import {
  IonFab,
  IonList,
  IonFabButton,
  IonIcon,
  IonFabList
} from "@ionic/react";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { selectProfile } from "../../actions/profileAction";
import { fetchTrips, selectTrip } from "../../actions/tripAction";
import Trip from "../../components/trip/Trip";
import { Link } from "react-router-dom";
import "./Main.scss";
import "../../common/common-style.css";
import { removeBg } from "../../common/styleHelper";
import ProfilePanel from "../../components/profilePanel/ProfilePanel";

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      SavedTrips: []
    };
  }

  componentWillUnmount() {
    removeBg("main-bg");
  }

  componentDidMount() {
    document.body.className += " main-bg";
    this.props.login();
    this.props.user && this.props.fetchTrips();
  }

  render() {
    if (!this.props.user) {
      this.props.history.push("/login");
      return null;
    }
    return (
      <div className="main">
        <ProfilePanel
          img="https://ionicframework.com/docs/demos/api/avatar/avatar.svg"
          trips={this.props.trips.trips.length}
        />
        {this.props.trips.trips.length > 0 ? (
          <IonList>
            {this.props.trips.trips.map((trip, i) => {
              return (
                <Trip
                  key={`${trip.start_date}-${trip.end_date}`}
                  city={trip.city}
                  startDate={trip.start_date}
                  endDate={trip.end_date}
                  attractions={trip.places}
                  viewTrip={() => {
                    this.props.history.push(`/trips/${i}`);
                    this.props.selectTrip(trip);
                  }}
                />
              );
            })}
          </IonList>
        ) : (
          <p className="no-trip">You dont have any trips</p>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <Link to="/profile">
            <IonFabButton>
              <IonIcon name="add" />
            </IonFabButton>
          </Link>
        </IonFab>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.token,
  trips: state.trips
});

export default connect(
  mapStateToProps,
  { login, selectProfile, fetchTrips, selectTrip }
)(Main);
