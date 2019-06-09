import React, { Component } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { Link, Redirect } from "react-router-dom";
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

  componentDidMount() {
    document.body.className += " gradient-bg";
  }

  render() {
    if (this.props.user) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-wrapper">
        <img alt="logo" src={logo} />
        <br />
        <div className="login-button-wrapper">
          <Link to="/">
            <IonButton onClick={this.props.login} className="login-button">
              <IonIcon
                slot="start"
                name="logo-google"
                className="login-logo-google"
              />
              Connect With Google
            </IonButton>
          </Link>
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
