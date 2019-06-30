import React, { Component } from "react";
import { API_BASE } from "../../api/consts";
import Chip from "../../components/chip/Chip";
import "./Tags.scss";
import NameDialog from "../../components/nameDialog/NameDialog";
import PytheasApi from "../../api/Api";
import Loader from "../../components/loader/Loader";
import Header from "../../components/header/Header";
import Common from "../../utils/common";

const PICTURES_TAGS = {
  shopping:
    "https://gezmeli.az/wp-content/uploads/2018/07/shopping-%D0%B2%D0%BE-%D0%BB%D1%8C%D0%B2%D0%BE%D0%B2%D0%B5.jpg",
  "sights & landmarks": "sights & landmarks",
  "nature & parks":
    "https://www.nparks.gov.sg/-/media/nparks-real-content/gardens-parks-and-nature/parks-and-nature-reserve/windsor-nature-park/windsor_nature_park.jpg",
  "points of interest & landmarks":
    "https://img-s1.onedio.com/id-5ba8cd84fea7acb431b0fa48/rev-0/raw/s-b8946bd32f764e074f3f25968765b432dd53d877.jpg",
  museums:
    "http://cdn1.discovertuscany.com/img/florence/museums/palatine-gallery/palatine-picture-gallery.jpg?auto=compress,enhance,format&w=",
  "historic sites":
    "https://www.planetware.com/photos-large/PER/egypt-pyramids-world-heritage.jpg",
  "architectural buildings":
    "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fduncanmadden%2Ffiles%2F2018%2F04%2F03_Sydney-1200x801.jpg",
  "outdoor activities":
    "https://d5qsyj6vaeh11.cloudfront.net/images/whats%20available/editorial%20orphan%20articles/article%20images/w2206_b_main.jpg",
  "sacred & religious sites":
    "https://d2ty3p0lzh1wfl.cloudfront.net/safetyhub_images/Israel/jerusalem.jpg",
  "specialty museums":
    "https://i.pinimg.com/originals/83/80/c6/8380c6bb4f73993b5cf942333b36cf0d.jpg",
  neighborhoods:
    "https://cdn.vox-cdn.com/thumbor/cSTfh-7oey-jQxP_4JkM-Ejv5bE=/4x0:783x519/1200x800/filters:focal(4x0:783x519)/cdn.vox-cdn.com/uploads/chorus_image/image/37093906/ex.0.0.png",
  beaches:
    "https://www.eurocheapo.com/blog/wp-content/uploads/2013/05/National-Portrait-Gallery.jpg",
  "art museums": "",
  "history museums":
    "https://mymodernmet.com/wp/wp-content/uploads/2018/03/history-of-museums-thumbnail.jpg",
  "flea & street markets":
    "https://www.welcometobratislava.eu/wp-content/uploads/2018/07/IMG_5010.jpg"
};

export class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: null,
      dialogOpen: false,
      selectedTags: [],
      loading: true,
      fetching: false
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
    const images = [];
    selectedTags.forEach(tag => {
      images.push(PICTURES_TAGS[tag]);
    });
    if (input.length > 0) {
      console.log("Creating new profile...");
      PytheasApi.post("/profile", {
        name: input,
        tags: selectedTags,
        image: Common.getRandomValueFromArray(images)
      }).catch(err => {
        this.props.history.push("/profile");
      });
    }
    this.setState({ fetching: true });
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
    return this.state.loading || this.state.fetching ? (
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
