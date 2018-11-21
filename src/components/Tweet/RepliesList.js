import React, { Component } from "react";
import { connect } from "react-redux";
import Tweet from "./Tweet";

class RepliesList extends Component {
  render() {
    const { id, replies } = this.props;

    const renderReplies = replies.length !== 0 && (
      <div className="tweet-replies-container">
        <h5 className="center font-weight-bold">Replies</h5>
        <ul>
          {replies.map(replyId => (
            <li key={id}>
              <Tweet id={replyId} />
            </li>
          ))}
        </ul>
      </div>
    );
    return <React.Fragment>{renderReplies}</React.Fragment>;
  }
}

function mapStateToProps({ tweets }, props) {
  const { id } = props;
  //check if the tweet with the passed id exists
  const sortedReplies = !tweets[id]
    ? //if it does not exist, return an empty array otherwise, return the related replies and sort by desc timestamp
      []
    : tweets[id].replies.sort(
        (a, b) => tweets[b].timestamp - tweets[a].timestamp
      );

  return {
    id,
    replies: sortedReplies
  };
}

export default connect(mapStateToProps)(RepliesList);
