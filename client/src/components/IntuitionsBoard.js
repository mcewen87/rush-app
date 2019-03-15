import React, { Component } from "react";
import "../App.css";

class IntuitionsBoard extends Component {
  constructor() {
    super();
    this.state = {
      intuitions: []
    };

    // => CRUD FOR INTUITIONS
    this.addIntuition = this.addIntuition.bind(this);
    this.deleteIntuition = this.deleteIntuition.bind(this);
    this.updateIntuition = this.updateIntuition.bind(this);
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
        this.setState({ intuitions: data });
      });
  }

  addIntuition(intuition) {
    const { title, body } = intuition;
    fetch("/create", {
      body: JSON.stringify({ title: title, body: body }),
      cache: "no-cache",
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    });
    this.setState({ intuitions: this.state.intuitions.concat(intuition) });
  }

  deleteIntuition(id) {
    fetch("/delete", {
      body: JSON.stringify({ id: id }),
      cache: "no-cache",
      headers: {
        "content-type": "application/json"
      },
      method: "DELETE"
    });
    this.setState({
      intuitions: this.state.intuitions.filter(el => el._id !== id)
    });
  }

  updateIntuition(intuition) {
    const { title, body, id } = intuition;
    fetch("/update", {
      body: JSON.stringify({ title: title, body: body, id: id }),
      cache: "no-cache",
      headers: {
        "content-type": "application/json"
      },
      method: "PATCH"
    });

    this.setState({
      intuitions: this.state.intuitions.map(el => {
        if (el._id === intuition.id) {
          return Object.assign({}, el, {
            title: intuition.title,
            body: intuition.body
          });
        } else {
          return el;
        }
      })
    });
  }

  render() {
    return (
      <EditableIntuitionsList
        list={this.state.intuitions}
        createNewIntuition={this.addIntuition}
        deleteOldIntuition={this.deleteIntuition}
        updateOldIntuition={this.updateIntuition}
      />
    );
  }
}
class IntuitionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      new: this.props._id
    };
    this.handleForm = this.handleForm.bind(this);
    this.test = this.test.bind(this);
  }

  handleForm() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  test() {
    alert(this.state.new);
  }

  render() {
    if (!this.state.isOpen) {
      return (
        <div className="card">
          <div className="innerCard">
            <h1 className="cardTitle">{this.props.title}</h1>
            <p className="cardBody">{this.props.body}</p>
          </div>
          <div className="floatRight">
            <button onClick={this.handleForm} className="formButton cardButton">
              Edit
            </button>
          </div>
        </div>
      );
    }
    return (
      <IntuitionForm
        title={this.props.title}
        body={this.props.body}
        id={this.props.id}
        close={this.handleForm}
        handleSubmit={this.props.submit}
        handleDelete={this.props.delete}
        sendUpdate={this.props.update}
      />
    );
  }
}

class IntuitionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title || "",
      body: this.props.body || ""
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.createIntuition = this.createIntuition.bind(this);
    this.deleteIntuition = this.deleteIntuition.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleBodyChange(e) {
    this.setState({ body: e.target.value });
  }

  createIntuition() {
    this.props.sendSubmit({
      title: this.state.title,
      body: this.state.body
    });
    this.setState({ title: "", body: "" });
    this.props.close();
  }

  deleteIntuition() {
    this.props.handleDelete(this.props.id);
    this.props.close();
  }

  handleUpdate() {
    this.props.sendUpdate({
      title: this.state.title,
      body: this.state.body,
      id: this.props.id
    });
  }
  render() {
    return (
      <div className="card">
        <div className="formBody">
          <div className="middleBody">
            <form>
              <input
                onChange={this.handleTitleChange}
                value={this.state.title}
                placeholder="Title"
                className="formInput"
                type="text"
              />
              <textarea
                onChange={this.handleBodyChange}
                value={this.state.body}
                placeholder="Write something, anything."
                className="field"
              />
            </form>
            <button onClick={this.props.close} className="formButton">
              Close
            </button>
            {this.props.id ? (
              <button onClick={this.handleUpdate} className="formButton">
                Save
              </button>
            ) : (
              <button onClick={this.createIntuition} className="formButton">
                Submit
              </button>
            )}

            <button onClick={this.deleteIntuition} className="formButton">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class IntuitionToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleForm = this.handleForm.bind(this);
  }
  handleForm() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    if (!this.state.isOpen) {
      return (
        <div onClick={this.handleForm} className="card toggle">
          <div className="center">
            <h1 className="plus">+</h1>
          </div>
        </div>
      );
    }
    return (
      <IntuitionForm
        sendDelete={this.props.handleDelete}
        sendSubmit={this.props.submit}
        sendUpdate={this.props.update}
        close={this.handleForm}
      />
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
      return (
        <IntuitionCard
          title={el.title}
          body={el.body}
          id={el._id}
          delete={this.props.deleteOldIntuition}
          update={this.props.updateOldIntuition}
        />
      );
    });
    return (
      <div className="boardContainer">
        {list}

        <IntuitionToggle submit={this.handleSubmit} />
      </div>
    );
  }
}

export default IntuitionsBoard;
