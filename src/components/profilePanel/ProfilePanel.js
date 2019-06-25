import React, { Component } from "react";
import "./ProfilePanel.scss";

export class ProfilePanel extends Component {
  render() {
    const name = "SHAKED ZRIHEN";

    return (
      <div className="profile-panel">
        <div className="header-profile">
          <p className="username">{name}</p>
        </div>
        <div className="profile-block" />
        <div
          className="profile-avatar"
          style={{ backgroundImage: `url(${this.props.img})` }}
        />
        <div className="saved-trips">
          <p className="saved-trips-number">0</p>
          <p className="saved-trips-text">SAVED</p>
        </div>
        <div className="trips">
          <p className="trips-number">{this.props.trips}</p>
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
