import React, { Component } from "react";
import { IonIcon, IonButton, IonToolbar } from "@ionic/react";
import ProfileElement from "../../components/profileElement";
import { MAX_PROFILE_COUNT } from "../../api/consts";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { selectProfile } from "../../actions/profileAction";
import { removeBg } from "../../common/styleHelper";
import "../../common/common-style.css";
import "./Profile.css";
import { styleBackBtn, styleToolkit as styleToolbar } from "./style";
import PytheasApi from "../../api/Api";
import Loader from "../../components/loader/Loader";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: null
    };
  }

  componentWillUnmount() {
    removeBg("gradient-bg");
  }

  async fetchData() {
    await PytheasApi.get("/profile")
      .then(body => this.setState({ profiles: body.profiles }))
      .catch(err => {
        console.log("error:", err);
        this.props.history.push("/login");
      });
  }

  componentDidMount() {
    this.fetchData();
    document.body.className += " gradient-bg";
  }

  render() {
    const { profiles } = this.state;

    if (!profiles) {
      return <Loader />;
    }
    console.log(JSON.stringify(profiles, null, 2));

    const profileElms = profiles.map((profile, i) => (
      <ProfileElement
        key={i}
        profile={profile}
        onClick={(e, p) => {
          this.props.history.push("/filter");
          this.props.selectProfile(profile);
        }}
      />
    ));

    if (profileElms.length < MAX_PROFILE_COUNT) {
      profileElms.push(
        <ProfileElement
          key={"add"}
          profile={{
            id: "add",
            name: "Add Profile",
            image: "https://ionicframework.com/docs/demos/api/avatar/avatar.svg"
          }}
          onClick={() => this.props.history.push("/new-profile")}
        />
      );
    }

    return (
      <React.Fragment>
        <IonToolbar style={styleToolbar} className="toolbar-background">
          <IonButton
            fill="clear"
            style={styleBackBtn}
            onClick={() => this.props.history.push("/")}
          >
            <IonIcon slot="icon-only" name="ios-arrow-back" />
          </IonButton>
        </IonToolbar>

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

const mapStateToProps = state => ({
  user: state.user.token,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { login, selectProfile }
)(Profile);
