import React, { Component } from "react";
import "./App.css";
import Cookies from "js-cookie";

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      auth: Cookies.get("session")
    };
    this.handleName = this.handleName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.signup = this.signup.bind(this);
  }

  handleName(e) {
    this.setState({ username: e.target.value });
  }
  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  login(e) {
    e.preventDefault();
    const { username } = this.state;
    const { password } = this.state;

    fetch("/login", {
      body: JSON.stringify({ username: username, password: password }),
      cache: "no-cache",
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    });
  }

  logout(e) {
    e.preventDefault();
    fetch("/testAuth");
  }

  signup(e) {
    e.preventDefault();
    const payload = this.state;
    fetch("/signup", {
      body: JSON.stringify({ payload }),
      cache: "no-cache",
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.auth}</h1>
        <div className="entryBox">
          <form onSubmit={this.login}>
            <input
              placeholder="User Name"
              type="text"
              value={this.state.username}
              onChange={this.handleName}
            />
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.handlePassword}
            />
            <input className="entryButton" type="submit" value="Login" />
          </form>
        </div>

        <div className="entryBox">
          <form onSubmit={this.signup}>
            <input
              placeholder="User Name"
              type="text"
              value={this.state.username}
              onChange={this.handleName}
            />
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.handlePassword}
            />
            <input className="entryButton" type="submit" value="Signup" />
          </form>
          <button onClick={this.logout}>Test Auth</button>
        </div>
      </div>
    );
  }
}

export default App;
