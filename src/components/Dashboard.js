import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard--container">
        <h3>timeline</h3>
        <ul className="dashboard-list">
          {this.props.tweetIds.map(id => (
            <li key={id}>
              <div>Tweet Id: {id}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

/**
 * Map tweets state to store
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
