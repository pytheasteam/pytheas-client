import React, { Component } from "react";
import {
  IonFab,
  IonList,
  IonFabButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFabList
} from "@ionic/react";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { Redirect } from "react-router";
import { TRIP_MOCK } from "../../mock/tripMock";
import { API_BASE } from "../../api/consts";
import Trip from "../../components/trip/Trip";
import { Link } from "react-router-dom";

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SavedTrips: []
    };
  }
  componentDidMount() {
    this.setState({ trips: TRIP_MOCK });
    // this.props.user &&
    //   fetch(API_BASE + "/trip", {
    //     method: "GET",
    //     headers: {
    //       Authorization: this.props.user
    //     }
    //   })
    //     .then(res => res.json())
    //     .then(body => this.setState({ trips: body }));
  }

  render() {
    if (!this.props.user) {
      return <Redirect to="/login" />;
    }
    return this.state.trips ? (
      <React.Fragment>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Hello from Main</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {this.state.trips.map(trip => {
            return (
              <Trip
                key={`${trip.start_date}-${trip.end_date}`}
                city={trip.city}
              />
            );
          })}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon name="add" />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton>
              <Link to="/profile">
                <ion-icon name="compass" />
              </Link>
            </IonFabButton>
            <IonFabButton>
              <ion-icon name="airplane" />
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </React.Fragment>
    ) : null;
  }
}

const mapStateToProps = state => ({ user: state.user.token });

export default connect(
  mapStateToProps,
  { login }
)(Main);
