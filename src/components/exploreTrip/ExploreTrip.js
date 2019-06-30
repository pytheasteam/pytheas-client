import React, { Component } from "react";
import "./ExploreTrip.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faDollarSign,
  faShekelSign,
  faEuroSign,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";
import PytheasApi from "../../api/Api";
import { updateTrip, saveTrip } from "../../actions/tripAction";
import { connect } from "react-redux";
import Common from "../../utils/common";

export class ExploreTrip extends Component {
  constructor(props) {
    super(props);
    let images = Common.collapsPhotos(this.props.attractions);
    const image = Common.getRandomValueFromArray(images);
    this.state = {
      currency: {
        USD: <FontAwesomeIcon icon={faDollarSign} />,
        nis: <FontAwesomeIcon icon={faShekelSign} />,
        euro: <FontAwesomeIcon icon={faEuroSign} />
      },
      image: image,
      saved: false
    };
    this.save = this.save.bind(this);
  }

  async save(e) {
    console.log("Saving trip from explore");
    const body = this.props.trips.trips[this.props.index];
    console.log(body, this.props.index);
    if (body && (body.id === -1 || !this.state.saved)) {
      PytheasApi.put("/trip", body).then(trip =>
        this.props.saveTrip(this.props.index, trip)
      );
      this.setState({ saved: true });
    }
  }

  render() {
    console.log(`this saved: ${this.state.saved}`);
    let attractionLen = this.props.attractions.reduce(
      (attractions, day) => attractions + day.length,
      0
    );
    attractionLen -= this.props.days;
    const style = this.state.image
      ? { backgroundImage: `url(${this.state.image})`, backgroundSize: "cover" }
      : {};
    return (
      <div className="explore-trip">
        <div className="trip-container">
          <div
            className="picture"
            style={style}
            onClick={() => this.props.viewTrip()}
          />
          <div className="trip-info">
            <p className="trip-name" onClick={() => this.props.viewTrip()}>
              Trip to {this.props.city}
            </p>
            <div className="info" onClick={() => this.props.viewTrip()}>
              <div className="days-container">
                <p className="number">{this.props.days}</p>
                <p className="days">DAYS</p>
              </div>
              <div className="attractions-container">
                <p className="location">
                  <FontAwesomeIcon
                    className="total-attraction-number"
                    icon={faMapMarkerAlt}
                  />
                </p>
                <p className="attraction">{attractionLen}</p>
              </div>
              <div className="price-container">
                <div className="icon">
                  {this.state.currency[this.props.currency]}
                </div>
                <div className="price">{this.props.price}</div>
              </div>
            </div>
          </div>
          <div className="save" onClick={this.save}>
            <FontAwesomeIcon
              className={
                !this.props.trips.trips[this.props.index].explore ||
                this.state.saved
                  ? "starred"
                  : ""
              }
              icon={faBookmark}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.token,
  trips: state.trips,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { updateTrip, saveTrip }
)(ExploreTrip);
