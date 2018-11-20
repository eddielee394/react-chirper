import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddTweet } from "../../actions/tweets";

class NewTweet extends Component {
  state = {
    text: ""
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
    //TODO: get id from route path
    dispatch(handleAddTweet(text, id));
    this.setState(() => ({
      text: ""
    }));
  };

  render() {
    const { text } = this.state;
    const tweetLeft = 280 - text.length;
    const tweetLength = tweetLeft <= 100 && (
      <div className="tweet-length">{tweetLeft}</div>
    );

    //TODO: redirect to home view when submitted

    return (
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="title-container text-center">
            <h3>Compose new tweet</h3>
          </div>
        </div>
        <div className="col-12 col-lg-8">
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
