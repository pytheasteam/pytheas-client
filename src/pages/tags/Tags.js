import React, { Component } from "react";
import { API_BASE } from "../../api/consts";
import Chip from "../../components/chip/Chip";
import "./Tags.scss";
import { IonButton, IonIcon, IonToolbar } from "@ionic/react";

export class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: null
    };
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
          <button className="next">Next</button>
        </div>
      )
    );
  }
}

export default Tags;
