import React, { Component } from "react";
import "./App.css";
import EntryBox from "./components/EntryBox";
import NavBar from "./components/NavBar";
import IntuitionsBoard from "./components/IntuitionsBoard";

export default ({ children }) => {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};
