import React, { Component } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { removeBg } from "../../common/styleHelper";

import logo from "../assets/logo.svg";

import "./Login.css";
import "../../common/common-style.css";

class Login extends Component {
  componentWillUnmount() {
    removeBg("gradient-bg");
  }
  componentDidUpdate(prevProps) {
    console.log(this.props.user);
    if (this.props.user) this.props.history.push("/");
  }
  componentDidMount() {
    document.body.className += " gradient-bg";
  }

  render() {
    return (
      <div className="login-wrapper">
        <img alt="logo" src={logo} />
        <br />
        <div className="login-button-wrapper">
          <IonButton onClick={this.props.login} className="login-button">
            <IonIcon
              slot="start"
              name="logo-google"
              className="login-logo-google"
            />
            Connect With Google
          </IonButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user.token });

export default connect(
  mapStateToProps,
  { login }
)(Login);
