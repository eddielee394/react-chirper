import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet } from "../../utils/helpers";
import IconsList from "./IconsList";
import { Link, withRouter } from "react-router-dom";

class Tweet extends Component {
  /**
   * Redirect to Parent Tweet
   * @param event
   * @param id
   */
  toParent = (event, id) => {
    event.preventDefault();
    this.props.history.push(`/tweet/${id}`);
  };

  render() {
    const { tweet, authUser } = this.props;

    //if tweet doesn't exist, only return notification
    if (tweet === null) {
      return <p>This tweet doesn't exist.</p>;
    }

    const { id, name, avatar, timestamp, text, parent } = tweet;

    //if parent exists, display replyToBtn
    const replyingToBtn = parent && (
      <span>
        <button
          className="replying-to font-weight-light"
          onClick={e => this.toParent(e, parent.id)}
        >
          <small>Replying to @{parent.author}</small>
        </button>
      </span>
    );

    return (
      <Link to={`/tweet/${id}`} className="tweet">
        <img className="avatar" src={avatar} />
        <div className="tweet-info">
          <div className="tweet-body d-flex flex-column">
            <span>{name}</span>
            <span>{timestamp}</span>
            {replyingToBtn}
            <p>{text}</p>
          </div>
          <IconsList tweet={tweet} authUser={authUser} />
        </div>
      </Link>
    );
  }
}

/**
 * Map state to props from store
 * @param authUser
 * @param users
 * @param tweets
 * @param id
 * @return {{authUser: *, tweet: {name, id, timestamp, text, avatar, likes, replies, hasLiked, parent}}}
 */
function mapStateToProps({ authUser, users, tweets }, { id }) {
  //get the current tweet from the tweets store state by id
  const tweet = tweets[id];

  //get parent/child tweet relation if exists, otherwise return null
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  //format the tweet if exists, otherwise return null
  const formattedTweet = tweet
    ? formatTweet(tweet, users[tweet.author], authUser, parentTweet)
    : null;

  //pass from store to component
  return {
    authUser,
    //get the tweet, author of the tweet & the current auth user
    tweet: formattedTweet
  };
}

export default withRouter(connect(mapStateToProps)(Tweet));
