import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";

import EntryBox from "./components/EntryBox";
import IntuitionsBoard from "./components/IntuitionsBoard";
import withAuth from "./components/withAuth";
import Test from "./components/Test";

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route path="/" exact component={EntryBox} />
      <Route path="/dashboard" component={withAuth(IntuitionsBoard)} />
      <Route path="/test" component={Test} />
    </App>
  </BrowserRouter>,
  document.getElementById("root")
);
