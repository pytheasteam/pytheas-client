import React, { Component } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonAvatar,
  IonItem,
  IonIcon,
  IonButton,
  IonGrid
} from "@ionic/react";
import ProfileElement from "../../components/profileElement";
import { API_BASE, MAX_PROFILE_COUNT } from "../../api/consts";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { Redirect } from "react-router";
import { removeGradientBg } from "../../common/styleHelper";

import "../../common/common-style.css";
import "./Profile.css";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenProfile: {}
    };
  }
  componentWillMount() {
    // this.props.user &&
    //   fetch(API_BASE + "/profile", {
    //     method: "GET",
    //     headers: {
    //       Authorization: this.props.user
    //     }
    //   })
    //     .then(res => res.json())
    //     .then(body => this.setState({ profiles: body.profiles }));

    this.setState({
      profiles: [
        { id: "art", name: "Art" },
        { id: "bachelors", name: "Bachelors" },
        { id: "family", name: "Family" }
      ]
    });
  }

  componentWillUnmount() {
    removeGradientBg();
  }

  componentDidMount() {
    document.body.className += " gradient-bg";
  }

  render() {
    // if (!this.props.user) {
    //   return <Redirect to="/login" />;
    // }

    const { profiles } = this.state;

    if (!profiles) {
      return null;
    }

    const profileElms = profiles.map((profile, i) => (
      <ProfileElement
        key={i}
        profile={profile}
        onClick={(e, p) => console.log(e, p)}
      />
    ));

    if (profileElms.length < MAX_PROFILE_COUNT) {
      profileElms.push(
        <ProfileElement
          key={"add"}
          profile={{ id: "add", name: "Add Profile" }}
          onClick={(e, p) => console.log(e, p)}
        />
      );
    }

    return (
      <React.Fragment>
        <IonButton
          fill="clear"
          className="back-btn"
          onClick={() => window.history.back()}
        >
          <IonIcon slot="icon-only" name="arrow-back" />
        </IonButton>
        <div className="profile-page">
          <span className="profile-page-title">
            Choose your traveler profile
          </span>
          <div className="profile-wrapper">{profileElms}</div>
        </div>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <IonGrid>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Hello from Profiles</IonTitle>
            </IonToolbar>
          </IonHeader>
          {profiles.map(profile => {
            return (
              <IonItem key={profile[0]}>
                <IonAvatar slot="start">
                  <img alt={profile[1]} src="https://picsum.photos/113" />
                </IonAvatar>
                <IonLabel>{profile[1]}</IonLabel>
              </IonItem>
            );
          })}
        </IonGrid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ user: state.user.token });

export default connect(
  mapStateToProps,
  { login }
)(Profile);
