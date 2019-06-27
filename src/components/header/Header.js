import React, { Component } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import "./Header.scss";

export class Header extends Component {
  render() {
    const { title, back } = this.props;
    return (
      <div className="header">
        <div className="back-btn-container">
          <IonButton
            fill="clear"
            className="back-btn ios button button-clear button-has-icon-only ion-activatable ion-focusable hydrated"
            onClick={back}
          >
            <IonIcon slot="icon-only" name="ios-arrow-back" />
          </IonButton>
        </div>

        {/* <IonToolbar className="toolbar-background ios hydrated">
          <IonButton
            fill="clear"
            className="back-btn ios button button-clear button-has-icon-only ion-activatable ion-focusable hydrated"
            onClick={back}
          >
            <IonIcon slot="icon-only" name="ios-arrow-back" />
          </IonButton>
        </IonToolbar> */}
        <p className="title">{`${title}`}</p>
      </div>
    );
  }
}

export default Header;
