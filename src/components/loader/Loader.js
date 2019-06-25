import React, { Component } from "react";
import "./Loader.scss";
import loader from "./assets/loader.gif";
import logo from "../../pages/assets/logoColored.svg";

export class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <img src={logo} alt="loader" />
        <img className="search" src={loader} alt="loader" />
      </div>
    );
  }
}

export default Loader;
