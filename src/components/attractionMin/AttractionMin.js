import React, { Component } from "react";
import "./AtrractionMin.scss";
import { upperFistLetter } from "../../common/styleHelper";
import Common from "../../utils/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export class AttractionMin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starred: false
    };

    this.toggleStar = this.toggleStar.bind(this);
  }

  toggleStar() {
    this.setState({ starred: !this.state.starred });
  }

  render() {
    const attractionName = upperFistLetter(this.props.city);
    return (
      <div className="attraction-min">
        <div
          className="trip-picture"
          style={{
            background: `url(${this.props.img || "https://picsum.photos/35"})`,
            backgroundSize: "cover"
          }}
        />
        <p
          aria-labelledby={attractionName}
          onClick={() =>
            this.props.viewAttraction(this.props.day, this.props.attractionId)
          }
          className="city-name"
        >
          {Common.formatName(attractionName, 20)}
        </p>
        <div className="trip-devider" />
        {this.state.starred ? (
          <FontAwesomeIcon
            onClick={this.toggleStar}
            className="rate-trip starred"
            icon={faStar}
          />
        ) : (
          <FontAwesomeIcon
            onClick={this.toggleStar}
            className="rate-trip"
            icon={faStar}
          />
        )}
      </div>
    );
  }
}

export default AttractionMin;
