import React, { Component } from "react";
import { IonAvatar } from "@ionic/react";
import "./ProfilePanel.scss";

export class ProfilePanel extends Component {
  render() {
    return (
      <div className="profile-panel">
        <div className="header-profile" />
        <div className="profile-block" />
        <div className="profile-avatar">
          <IonAvatar className="avatar-img">
            <img src={this.props.img} alt="profile" />
          </IonAvatar>
        </div>
        <div className="saved-trips">
          <p className="saved-trips-number">0</p>
          <p className="saved-trips-text">SAVED</p>
        </div>
        <div className="trips">
          <p className="trips-number">0</p>
          <p className="trips-text">TRIPS</p>
        </div>
        <button
          variant="extended"
          size="medium"
          className="edit-profile"
          onClick={() => {
            this.props.history.push("/explore");
          }}
          aria-label="Add"
        >
          Edit profile
        </button>
      </div>
    );
  }
}

export default ProfilePanel;
