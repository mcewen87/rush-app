import React, { Component } from "react";
import welcome from "../img/welcome.jpg";
import "../App.css";
class EntryBox extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: ""
    };

    // => FORM HANDLING
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);

    // => LOGIN AND LOGOUT
    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }
  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  signup(e) {
    e.preventDefault();
    const { email } = this.state;
    const { password } = this.state;
    fetch("/signup", {
      body: JSON.stringify({ email: email, password: password }),
      cache: "no-cache",
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    })
      .then(res => res.json())
      .then(res => alert(res.token));
  }

  signin(e) {
    e.preventDefault();
    const { email } = this.state;
    const { password } = this.state;

    fetch("/signin", {
      body: JSON.stringify({ email: email, password: password }),
      cache: "no-cache",
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    });
  }

  signout(e) {
    e.preventDefault();
    fetch("/signout", {
      method: "GET"
    });
    this.setState({ loggedIn: false });
  }

  render() {
    return (
      <div className="entryBox">
        <img src={welcome} className="welcome" />
        <h1 className="welcomeHeader">Welcome to Rush</h1>
        <p className="welcomeBody">
          Rush is a thought board, a place to jot down your intuitions, keep
          them, delete them, cultivate them, and should you desire, share them
          with the world: 💡🔥🚀
        </p>

        <form>
          <input
            placeholder="Email"
            type="text"
            value={this.state.email}
            onChange={this.handleEmail}
          />
          <input
            placeholder="Password"
            type="password"
            value={this.state.password}
            onChange={this.handlePassword}
          />
          <button onClick={this.signin} className="entryButton">
            Sign In
          </button>
          <button onClick={this.signup} className="entryButton">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default EntryBox;
