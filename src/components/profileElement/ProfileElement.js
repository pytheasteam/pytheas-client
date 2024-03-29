import React, { Component } from "react";

import "./ProfileElement.css";

export class ProfileElement extends Component {
  render() {
    const { id, name, image } = this.props.profile;
    return (
      <div
        className="profile-element"
        onClick={e => this.props.onClick && this.props.onClick(e, id)}
      >
        <div
          className="profile-element-img"
          style={{ backgroundImage: `url(${image})` }}
        />
        <span>{name}</span>
      </div>
    );
  }
}

export default ProfileElement;
