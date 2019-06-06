import React, { Component } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonAvatar,
  IonItem,
  IonGrid
} from "@ionic/react";
import { API_BASE } from "../../api/consts";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { Redirect } from "react-router";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenProfile: {}
    };
  }
  componentWillMount() {
    this.props.user &&
      fetch(API_BASE + "/profile", {
        method: "GET",
        headers: {
          Authorization: this.props.user
        }
      })
        .then(res => res.json())
        .then(body => this.setState({ profiles: body.profiles }));
  }

  render() {
    if (!this.props.user) {
      return <Redirect to="/login" />;
    }
    console.log(this.state.profiles);
    return this.state.profiles ? (
      <React.Fragment>
        <IonGrid>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Hello from Profiles</IonTitle>
            </IonToolbar>
          </IonHeader>
          {this.state.profiles.map(profile => {
            return (
              <IonItem key={profile.id}>
                <IonAvatar slot="start">
                  <img alt={profile.name} src="https://picsum.photos/113" />
                </IonAvatar>
                <IonLabel>{profile.name}</IonLabel>
              </IonItem>
            );
          })}
        </IonGrid>
      </React.Fragment>
    ) : null;
  }
}

const mapStateToProps = state => ({ user: state.user.token });

export default connect(
  mapStateToProps,
  { login }
)(Profile);
