import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../App.css";
import SpinnerComponent from "./SpinnerComponent";
import EditPage from "./EditPage";

class IntuitionsBoard extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      intuitions: []
    };
  }

  componentDidMount() {
    fetch("/getIntuitions")
      .then(intuitions => {
        if (intuitions.ok) {
          return intuitions.json();
        }
        return [];
      })
      .then(data => {
        this.setState({ intuitions: data, loading: false });
      });
  }

  render() {
    var { loading } = this.state;

    if (loading) {
      return <SpinnerComponent />;
    }
    return <EditableIntuitionsList list={this.state.intuitions} />;
  }
}
class IntuitionCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link
        to={{
          pathname: "/editpage",
          state: {
            title: this.props.title,
            body: this.props.body,
            id: this.props.id
          }
        }}
      >
        {" "}
        <div className="card">
          <div className="innerCard">
            <h1 className="cardTitle">{this.props.title}</h1>
            <p className="cardBody">{this.props.body}</p>
          </div>
        </div>
      </Link>
    );
  }
}

class NewIntuition extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={this.handleForm} className="card toggle">
        <div className="center">
          <h1 className="plus">+</h1>
        </div>
      </div>
    );
  }
}

class EditableIntuitionsList extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(intuition) {
    this.props.createNewIntuition(intuition);
  }
  render() {
    const list = this.props.list.map((el, index) => {
      return <IntuitionCard title={el.title} body={el.body} id={el._id} />;
    });
    return (
      <div className="boardContainer">
        {list}

        <NewIntuition submit={this.handleSubmit} />
      </div>
    );
  }
}

export default IntuitionsBoard;
