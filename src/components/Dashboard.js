import React, { Component } from "react";
import { connect } from "react-redux";
import Tweet from "./Tweet/Tweet";

class Dashboard extends Component {
  render() {
    const { tweetIds } = this.props;
    return (
      <div className="row">
        <div className="col-12">
          <div className="dashboard--container">
            <ul className="dashboard-list">
              {tweetIds.map(id => (
                <li key={id}>
                  <Tweet id={id} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Map state to props from store
 * @param tweets
 * @return {{tweetIds: string[]}}
 */
function mapStateToProps({ tweets }) {
  return {
    //get tweet id's
    tweetIds: Object.keys(tweets).sort(
      //sort by timestamp
      (a, b) => tweets[b].timestamp - tweets[a].timestamp
    )
  };
}

export default connect(mapStateToProps)(Dashboard);
