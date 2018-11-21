import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddTweet } from "../../actions/tweets";

class NewTweet extends Component {
  state = {
    text: "",
    redirectOnSubmit: false
  };

  /**
   * Input change event handler
   * @param event
   */
  handleChange = event => {
    const text = event.target.value;
    this.setState(() => ({
      text
    }));
  };

  /**
   * Form event submit handler
   * @param event
   */
  handleSubmit = event => {
    event.preventDefault();
    const { text } = this.state;
    const { dispatch, id } = this.props;
    //dispatch the handleAddTweet action
    dispatch(handleAddTweet(text, id, this.handleRedirectOnSubmit));

    //reset the text state and if id doesn't exist, then update the redirectOnSubmit state to true
    this.setState({
      text: "",
      redirectOnSubmit: !id
    });
  };

  /**
   * Handle's on Submit redirect
   */
  handleRedirectOnSubmit = () => {
    const { redirectOnSubmit } = this.state;

    if (redirectOnSubmit === true) {
      this.setRedirectOnSubmit("/dashboard");
    }
  };

  /**
   * Sets the path for redirectOnSubmit
   * @param urlPath
   * @return {*}
   */
  setRedirectOnSubmit = urlPath => {
    return this.props.history.push(urlPath);
  };

  render() {
    const { text } = this.state;
    const tweetLeft = 280 - text.length;
    const tweetLength = tweetLeft <= 100 && (
      <div className="tweet-length">{tweetLeft}</div>
    );

    return (
      <div className="new-tweet-container">
        <div className="title-container text-center">
          <h3>Compose new tweet</h3>
        </div>
        <div className="new-tweet-form-container">
          <form className="new-tweet" onSubmit={this.handleSubmit}>
            <textarea
              className="textarea"
              maxLength={200}
              placeholder="What's the word, bird???"
              value={text}
              onChange={this.handleChange}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={text === ""}
            >
              Submit
            </button>
            {tweetLength}
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(NewTweet);
