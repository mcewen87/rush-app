import React, { Component } from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }
  signout(e) {
    e.preventDefault();
    fetch("/signout", {
      method: "GET"
    });
  }
  render() {
    const toggle = this.props.isLoggedIn;
    return (
      <div className="navBar">
        <div className="leftNav">
          <NavLink to="/">
            {" "}
            <h3>Home</h3>{" "}
          </NavLink>
          <NavLink to="/dashboard">
            {" "}
            <h3> Dashboard </h3>{" "}
          </NavLink>
          <NavLink to="/intuitions">
            {" "}
            <h3>Intuitions</h3>{" "}
          </NavLink>
          <NavLink to="/test">
            {" "}
            <h3> About </h3>{" "}
          </NavLink>
        </div>
        <div className="rightNav">
          <button onClick={this.signout} className="signout">
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default NavBar;
