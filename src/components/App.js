//Dependencies
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import { Slide, ToastContainer } from "react-toastify";

//Custom components
import Loader from "./Loader/Loader";
import NewTweet from "./NewTweet/NewTweet";
import NavigationBar from "./NavigationBar";
import Dashboard from "./Dashboard";
import TweetPage from "./TweetPage";

//imported methods/functions
import { handleInitialData } from "../actions/shared";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    const { loading } = this.props;

    return (
      <Router>
        <div className="main h-100v">
          <LoadingBar />
          <NavigationBar />
          {loading === true ? (
            <div className="container d-flex justify-content-center h-100">
              <div className="row justify-content-center align-self-center">
                <div className="col-12">
                  <Loader />
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/new" component={NewTweet} />
              <Route exact path="/tweet/:id" component={TweetPage} />
            </div>
          )}
          <ToastContainer
            transition={Slide}
            newestOnTop={true}
            hideProgressBar={true}
          />
        </div>
      </Router>
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
