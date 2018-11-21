import React, { Component } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading-bar";
import { Slide, ToastContainer } from "react-toastify";
import TweetPage from "./TweetPage";

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
        <LoadingBar />
        <div className="container">
          {dashboard}
          <TweetPage match={{ params: { id: "2mb6re13q842wu8n106bhk" } }} />
        </div>
        <ToastContainer
          transition={Slide}
          newestOnTop={true}
          hideProgressBar={true}
        />
      </div>
    );
  }
}

/**
 * Map state to props from store
 * @param authUser
 * @return {{loading: boolean}}
 */
function mapStateToProps({ authUser }) {
  return {
    loading: authUser === null
  };
}

export default connect(mapStateToProps)(App);
