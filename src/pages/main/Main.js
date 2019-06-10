import React, { Component } from "react";
import {
  IonFab,
  IonList,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonLoading
} from "@ionic/react";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { selectProfile } from "../../actions/profileAction";
import { TRIP_MOCK } from "../../mock/tripMock";
import { API_BASE } from "../../api/consts";
import Trip from "../../components/trip/Trip";
import { Link, Redirect } from "react-router-dom";
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
    this.setState({ trips: TRIP_MOCK });
    document.body.className += " main-bg";

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
    // if (!this.props.user) {
    //   return <Redirect to="/login" />;
    // }
    return (
      <div className="main">
        <ProfilePanel img="https://ionicframework.com/docs/demos/api/avatar/avatar.svg" />
        {this.state.trips.length > 0 ? (
          <IonList>
            {this.state.trips.map(trip => {
              return (
                <Trip
                  key={`${trip.start_date}-${trip.end_date}`}
                  city={trip.city}
                  startDate={trip.start_date}
                  endDate={trip.end_date}
                  attractions={trip.places}
                />
              );
            })}
          </IonList>
        ) : (
          <p className="no-trip">You dont have any trips</p>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon name="add" />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton>
              <Link to="/profile">
                <IonIcon name="compass" />
              </Link>
            </IonFabButton>
            <IonFabButton>
              <IonIcon name="airplane" />
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user.token });

export default connect(
  mapStateToProps,
  { login, selectProfile }
)(Main);
