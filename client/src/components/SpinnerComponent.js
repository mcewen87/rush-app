import React, { Component } from "react";
import "../App.css";

class SpinnerComponent extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="spinnerContainer">
        <div className="spinner" />
      </div>
    );
  }
}

export default SpinnerComponent;
