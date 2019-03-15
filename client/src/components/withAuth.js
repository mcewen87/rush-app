import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        redirect: null
      };
    }

    componentDidMount() {
      fetch("/protected")
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then(res => {
          if (res.auth) {
            this.setState({ redirect: false });
          } else {
            this.setState({ redirect: true });
          }
        });
    }

    render() {
      const { redirect } = this.state;

      if (redirect) {
        return <Redirect to="/" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  };
}
