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
import { TRIP_MOCK } from "../../mock/tripMock";
import { API_BASE } from "../../api/consts";
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
    return this.state.trips ? (
      <div className="main">
        <ProfilePanel img="https://ionicframework.com/docs/demos/api/avatar/avatar.svg" />
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
          <IonFabButton className="fab-main">
            <IonIcon name="add" />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton>
              <Link to="/profile">
                <IonIcon className="icon-inner" name="compass" />
              </Link>
            </IonFabButton>
            <IonFabButton>
              <IonIcon className="icon-inner" name="airplane" />
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => ({ user: state.user.token });

export default connect(
  mapStateToProps,
  { login, selectProfile }
)(Main);
