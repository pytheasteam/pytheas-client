import React, { Component } from "react";

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }
  render() {
    return <IonApp />;
  }
}

export default Main;
