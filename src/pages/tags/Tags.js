import React, { Component } from "react";
import { API_BASE } from "../../api/consts";
import Chip from "../../components/chip/Chip";
import "./Tags.scss";
import { IonButton, IonIcon, IonToolbar } from "@ionic/react";
import NameDialog from "../../components/nameDialog/NameDialog";

export class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: null,
      dialogOpen: false
    };
    this.getDialogInput = this.getDialogInput.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  getDialogInput(input) {
    console.log(input);
    this.setState({ dialogOpen: false });
  }
  handleDialogClose() {
    this.setState({ dialogOpen: false });
  }
  componentDidMount() {
    fetch(API_BASE + "/tags", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(body => {
        this.setState({ tags: body });
      });
  }
  render() {
    return (
      this.state.tags && (
        <div className="tags">
          <div className="header">
            <IonToolbar className="toolbar-background">
              <IonButton
                fill="clear"
                onClick={() => {
                  window.history.back();
                }}
                className="back-btn"
              >
                <IonIcon slot="icon-only" name="arrow-back" />
              </IonButton>
            </IonToolbar>
          </div>
          <p className="title">What you’re interested in?</p>
          <div className="chip-container">
            {this.state.tags.map(tag => {
              return <Chip key={tag.id} name={tag.name} />;
            })}
          </div>
          <button
            className="next"
            onClick={() => this.setState({ dialogOpen: true })}
          >
            Next
          </button>
          <NameDialog
            open={this.state.dialogOpen}
            onCreate={this.getDialogInput}
            handleDialogClose={this.handleDialogClose}
            title="Enter profile name"
            text="Next"
          />
        </div>
      )
    );
  }
}

export default Tags;
