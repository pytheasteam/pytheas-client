import React, { Component } from "react";
import { IonIcon, IonButton } from "@ionic/react";
import ProfileElement from "../../components/profileElement";
import {
  API_BASE,
  MAX_PROFILE_COUNT,
  PICTURE_GENERATOR
} from "../../api/consts";
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

  componentWillUnmount() {
    removeGradientBg();
  }

  componentDidMount() {
    document.body.className += " gradient-bg";
  }

  render() {
    if (!this.props.user) {
      return <Redirect to="/login" />;
    }

    const { profiles } = this.state;

    if (!profiles) {
      return null;
    }

    const profileElms = profiles.map((profile, i) => (
      <ProfileElement
        key={i}
        profile={{ ...profile, pic: PICTURE_GENERATOR }}
        onClick={(e, p) => console.log(e, p)}
      />
    ));

    if (profileElms.length < MAX_PROFILE_COUNT) {
      profileElms.push(
        <ProfileElement
          key={"add"}
          profile={{
            id: "add",
            name: "Add Profile",
            pic: "https://ionicframework.com/docs/demos/api/avatar/avatar.svg"
          }}
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
  }
}

const mapStateToProps = state => ({ user: state.user.token });

export default connect(
  mapStateToProps,
  { login }
)(Profile);
