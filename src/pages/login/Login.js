import React, { Component } from "react";
import { IonApp, IonButton } from "@ionic/react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";

class Login extends Component {
  render() {
    if (this.props.user) {
      return <Redirect to="/" />;
    }
    return (
      <Link to="/">
        <IonButton onClick={this.props.login}> Login </IonButton>
      </Link>
    );
  }
}

const mapStateToProps = state => ({ user: state.user.token });

export default connect(
  mapStateToProps,
  { login }
)(Login);
