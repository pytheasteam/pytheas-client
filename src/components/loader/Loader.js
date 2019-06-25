import React, { Component } from "react";
import "./Loader.scss";
import loader from "./assets/loader.gif";

export class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <img src={loader} alt="loader" />
      </div>
    );
  }
}

export default Loader;
