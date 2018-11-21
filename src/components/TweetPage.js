import React, { Component } from "react";
import { connect } from "react-redux";
import Tweet from "./Tweet/Tweet";
import NewTweet from "./NewTweet/NewTweet";
import RepliesList from "./Tweet/RepliesList";

class TweetPage extends Component {
  render() {
    const { id } = this.props;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12 my-2">
            <Tweet id={id} />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <NewTweet id={id} />
          </div>
        </div>
        <div className="row">
          <div className="col-12 my-2">
            <RepliesList id={id} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ authUser, tweets, users }, props) {
  const { id } = props.match.params;

  return {
    id
  };
}

export default connect(mapStateToProps)(TweetPage);
