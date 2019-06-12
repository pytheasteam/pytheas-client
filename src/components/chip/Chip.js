import React, { Component } from "react";
import "./Chip.scss";
export class Chip extends Component {
  constructor() {
    super();
    this.state = {
      selected: false
    };
  }

  toggleChip() {
    this.setState({ selected: !this.state.selected });
  }

  render() {
    if (this.state.selected) {
      return (
        <button className="chip selected" onClick={() => this.toggleChip()}>
          {this.props.name}
        </button>
      );
    }
    return (
      <button className="chip" onClick={() => this.toggleChip()}>
        {this.props.name}
      </button>
    );
  }
}

export default Chip;
