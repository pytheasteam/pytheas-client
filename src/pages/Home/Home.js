import { IonButton, IonContent } from "@ionic/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <IonContent>
        <Link to="/settings">
          <IonButton color="danger">Settings</IonButton>
        </Link>
      </IonContent>
    );
  }
}

export default Home;
