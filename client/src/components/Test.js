import React, { Component } from "react";
import "../App.css";

class Test extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("/protected")
      .then(res => {
        return res.json();
      })
      .then(res => alert(res.auth));
  }

  render() {
    return <div> hello </div>;
  }
}

export default Test;
