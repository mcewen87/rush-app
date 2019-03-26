import React, { Component } from "react";
import "../App.css";

class EditPage extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      id: ""
    };
    this.handleTitle = this.handleTitle.bind(this);
    this.handleBody = this.handleBody.bind(this);
    this.addIntuition = this.addIntuition.bind(this);
  }

  handleTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleBody(e) {
    this.setState({ body: e.target.value });
  }

  addIntuition() {
    const { title, body } = this.state;
    fetch("/create", {
      body: JSON.stringify({ title: title, body: body }),
      cache: "no-cache",
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    });
  }

  componentDidMount() {
    this.setState({
      title: this.props.location.state.title,
      body: this.props.location.state.body,
      id: this.props.location.state.id
    });
  }

  render() {
    return (
      <div className="editBox">
        <button onClick={this.addIntuition}>Save</button>
        <form className="editForm">
          <input
            className="editTitle"
            placeholder="Title"
            type="text"
            value={this.state.title}
            onChange={this.handleTitle}
          />

          <textarea
            className="editBody"
            value={this.state.body}
            placeholder="Hello, author, thinker, doer..."
            onChange={this.handleBody}
          />
        </form>
      </div>
    );
  }
}

export default EditPage;
