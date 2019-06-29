import React, { Component } from "react";
import { API_BASE } from "../../api/consts";
import Chip from "../../components/chip/Chip";
import "./Tags.scss";
import { IonButton, IonIcon, IonToolbar } from "@ionic/react";
import NameDialog from "../../components/nameDialog/NameDialog";
import PytheasApi from "../../api/Api";
import Loader from "../../components/loader/Loader";
import Header from "../../components/header/Header";

export class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: null,
      dialogOpen: false,
      selectedTags: [],
      loading: true
    };
    this.getDialogInput = this.getDialogInput.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.selectTag = this.selectTag.bind(this);
  }

  selectTag(tagId) {
    let index = this.state.selectedTags.indexOf(tagId);
    if (index === -1) {
      this.state.selectedTags.push(tagId);
    } else {
      this.state.selectedTags.splice(index, 1);
    }
  }

  async getDialogInput(input) {
    const selectedTags = [];
    this.state.selectedTags.forEach(tag =>
      selectedTags.push(this.state.tags[tag].name)
    );
    if (input.length > 0) {
      console.log("Creating new profile...");
      PytheasApi.post("/profile", {
        name: input,
        tags: selectedTags
      })
        .then(this.props.history.push("/profile"))
        .catch(err => {
          console.log(err);
          this.props.history.push("/profile");
        });
    }
    this.setState({ loading: true });
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
    const tags = this.state.tags;
    if (tags && this.state.loading) {
      this.setState({ loading: false });
    }
    return this.state.loading ? (
      <Loader />
    ) : (
      <div className="tags">
        <Header
          back={() => {
            window.history.back();
          }}
          title=""
          backgroundColor="white"
          arrowColor="#ff5347"
        />
        <p className="title">What you’re interested in?</p>
        <div className="chip-container">
          {this.state.tags.map((tag, i) => {
            return (
              <Chip
                key={tag.id}
                name={tag.name}
                select={() => this.selectTag(i)}
              />
            );
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
    );
  }
}

export default Tags;
