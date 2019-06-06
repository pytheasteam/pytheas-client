import React, { Component } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";

import logo from "../assets/logo.svg";

import "./Login.css";

class Login extends Component {
  componentWillUnmount() {
    const classNames = document.body.className.split(" ");
    document.body.className = classNames
      .filter(cName => cName !== "login-body")
      .join(" ");
  }

  componentDidMount() {
    document.body.className += " login-body";
  }

  render() {
    if (this.props.user) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-wrapper">
        <img src={logo} />
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
