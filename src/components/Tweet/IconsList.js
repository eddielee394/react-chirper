import React, { Component } from "react";
import { connect } from "react-redux";
import { IconContext } from "react-icons";
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline
} from "react-icons/ti";
import { handleToggleTweet } from "../../actions/tweets";

class IconsList extends Component {
  /**
   * Handle Like event
   * @param event
   */
  handleLike = event => {
    event.preventDefault();
    const { dispatch, tweet, authUser } = this.props;
    //Call the ToggleTweet method from the store
    dispatch(
      handleToggleTweet({ id: tweet.id, hasLiked: tweet.hasLiked, authUser })
    );
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
          <TiArrowBackOutline />
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

export default connect()(IconsList);
