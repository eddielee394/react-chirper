import React, { Component } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    const { loading } = this.props;
    //conditionally display dashboard if state isn't loading
    let dashboard = loading ? null : <Dashboard />;

    return (
      <div className="main">
        <div className="container">{dashboard}</div>
      </div>
    );
  }
}

/**
 * Map state to the store
 * @param authUser
 * @return {{loading: boolean}}
 */
function mapStateToProps({ authUser }) {
  return {
    loading: authUser === null
  };
}

export default connect(mapStateToProps)(App);
