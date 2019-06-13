import React, { Component } from "react";
import {
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonDatetime
} from "@ionic/react";
import "./Filter.scss";
import Fab from "@material-ui/core/Fab";
import moment from "moment";
import { connect } from "react-redux";

const iconStyle = {
  marginRight: "4px",
  position: "relative",
  bottom: "-2px"
};

const fabStyle = {
  background: "rgb(255, 83, 71)",
  color: "white",
  width: "187px",
  boxShadow: "none",
  position: "relative",
  margin: "10% auto",
  top: "90pt"
};

export class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
      destination: "",
      from: "",
      to: "",
      people: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handelToChange = this.handelToChange.bind(this);
    this.handelFromChange = this.handelFromChange.bind(this);
  }

  handleChange(e) {
    const input = e.target.name;
    this.setState({
      [input]: e.target.value
    });
  }
  handelFromChange(e) {
    let time = moment(new Date(e.target.value)).format("DD/MM/YYYY");
    this.setState({
      from: time
    });
  }
  handelToChange(e) {
    let time = moment(new Date(e.target.value)).format("DD/MM/YYYY");
    this.setState({
      to: time
    });
  }

  render() {
    return (
      <div className="filter">
        <IonToolbar>
          <IonButton
            fill="clear"
            className="back-btn"
            onClick={() => window.history.back()}
          >
            <IonIcon slot="icon-only" name="arrow-back" />
          </IonButton>
          <IonTitle className="title">Filters</IonTitle>
        </IonToolbar>
        <div className="container">
          <div lines="none" className="filter-item">
            <label position="floating" style={{ display: "block" }}>
              <IonIcon name="pin" slot="start" style={iconStyle} />
              Destination
            </label>
            <input
              type="text"
              name="destination"
              // className="destination"
              value={this.state.destination}
              placeholder="Type your dest"
              onChange={this.handleChange}
              // autoComplete="true"
            />
          </div>
          <div lines="none" className="filter-item">
            <label position="floating" style={{ display: "block" }}>
              <ion-icon name="calendar" slot="start" style={iconStyle} />
              Dates
            </label>
            <IonDatetime
              placeholder="start"
              style={{ marginLeft: "-13px" }}
              display-format="DD/MM/YYYY"
              picker-format="DD MMMM YYYY"
              onIonChange={this.handelFromChange}
            />
            <IonDatetime
              placeholder="end"
              style={{ marginLeft: "-13px" }}
              display-format="DD/MM/YYYY"
              picker-format="DD MMMM YYYY"
              onIonChange={this.handelToChange}
            />
          </div>
          <div lines="none" className="filter-item">
            <label position="floating" style={{ display: "block" }}>
              <ion-icon name="pricetag" slot="start" style={iconStyle} />
              Price
            </label>
            <input
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
              placeholder="Replace with Range"
            />
          </div>
          <div lines="none" className="filter-item">
            <label position="floating" style={{ display: "block" }}>
              <ion-icon name="people" slot="start" style={iconStyle} />
              People
            </label>
            <input
              name="people"
              value={this.state.people}
              onChange={this.handleChange}
              placeholder="Replace with Options"
            />
          </div>
        </div>
        <Fab
          variant="extended"
          size="medium"
          style={fabStyle}
          onClick={() => {
            this.props.history.push(
              `/explore?city=${this.state.destination}&price=${
                this.state.price
              }&from=${this.state.from}&to=${this.state.to}&travelers=${
                this.state.people
              }&profile=${this.props.profile.id}`
            );
          }}
          aria-label="Add"
        >
          Explore
        </Fab>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.token,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {}
)(Filter);
