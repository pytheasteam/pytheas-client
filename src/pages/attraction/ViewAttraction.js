import React, { Component } from "react";
import "./ViewAttraction.scss";
import { removeBg } from "../../common/styleHelper";
import { connect } from "react-redux";
import { login } from "../../actions/userAction";
import { selectProfile } from "../../actions/profileAction";
import { fetchTrips } from "../../actions/tripAction";
import Header from "../../components/header/Header";
import Common from "../../utils/common";

export class ViewAttraction extends Component {
  componentWillUnmount() {
    removeBg("trip-main-bg");
  }

  componentDidMount() {
    document.body.className += " trip-main-bg";
  }

  formatDescription(description) {
    let desc =
      description.length > 0
        ? description.split(/\.(?=[^\.]+$)/)[0]
        : "Not available";
    if (desc.startsWith("Close") || desc.startsWith("About")) {
      desc = "Not available";
    }
    return desc;
  }

  render() {
    const attraction =
      this.props.trips.trip.places &&
      this.props.trips.trip.places[this.props.match.params.day][
        this.props.match.params.id
      ];
    if (!attraction) {
      this.props.history.push("/");
      return null;
    }

    return (
      <div className="view-attraction">
        <Header
          title={Common.formatName(attraction.name, 20)}
          back={() => {
            window.history.back();
          }}
        />

        <div
          className="trip-picture"
          style={{
            background: `url(${attraction.photo_url ||
              "https://picsum.photos/35"})`,
            backgroundSize: "cover"
          }}
        />
        <div className="description-container">
          <p className="title">Description</p>
          <p className="description">
            {this.formatDescription(attraction.description)}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.token,
    trips: state.trips
  };
};

export default connect(
  mapStateToProps,
  { login, selectProfile, fetchTrips }
)(ViewAttraction);
