import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet } from "../utils/helpers";

class Tweet extends Component {
  render() {
    const { tweet } = this.props;
    //if tweet doesn't exist, only return notification
    if (tweet === null) {
      return <p>This tweet doesn't exist.</p>;
    }

    return (
      <div>
        <div>Tweet Id: {tweet.id}</div>
        <div className="">Tweet name: {tweet.name}</div>
        <div className="">Tweet text: {tweet.text}</div>
      </div>
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

export default connect(mapStateToProps)(Tweet);
