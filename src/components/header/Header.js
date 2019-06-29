import React, { Component } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import "./Header.scss";

export class Header extends Component {
  render() {
    const { title, back, backgroundColor, arrowColor } = this.props;
    const style = backgroundColor ? { background: backgroundColor } : null;
    const arrowStyle = arrowColor ? { color: arrowColor } : null;
    return (
      <div className="header" style={style}>
        <div className="back-btn-container">
          <IonButton
            fill="clear"
            className="back-btn ios button button-clear button-has-icon-only ion-activatable ion-focusable hydrated"
            onClick={back}
          >
            <IonIcon
              style={arrowStyle}
              slot="icon-only"
              name="ios-arrow-back"
            />
          </IonButton>
        </div>
        <p className="title">{`${title}`}</p>
      </div>
    );
  }
}

export default Header;
