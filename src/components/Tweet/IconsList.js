import React, { Component } from "react";
import { IconContext } from "react-icons";

import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline
} from "react-icons/ti";

class IconsList extends Component {
  handleLike = event => {
    event.preventDefault();
    //TODO: add like functionality
  };

  render() {
    const { tweet } = this.props;
    //if has replies, display them
    const replies = tweet.replies !== 0 && tweet.replies;
    //if has likes, display them
    const likes = tweet.likes !== 0 && tweet.likes;

    const likeIcon =
      tweet.hasLiked === true ? (
        <TiHeartFullOutline className="tweet-icon-liked" />
      ) : (
        <TiHeartOutline />
      );

    return (
      <div className="tweet-icons">
        <IconContext.Provider value={{ className: "tweet-icon" }}>
          <a href="#">
            <TiArrowBackOutline />
          </a>
          <span>{replies}</span>
          <button className="heart-button" onClick={this.handleLike}>
            {likeIcon}
          </button>
          <span>{likes}</span>
        </IconContext.Provider>
      </div>
    );
  }
}

export default IconsList;
