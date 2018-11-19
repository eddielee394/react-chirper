import React, { Component } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    return (
      <div className="main">
        <div className="container">Starter Code</div>
      </div>
    );
  }
}

export default connect()(App);
