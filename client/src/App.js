import React, { Component } from "react";
import "./App.css";
import EntryBox from "./components/EntryBox";
import NavBar from "./components/NavBar";
import IntuitionsBoard from "./components/IntuitionsBoard";

export default ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
//       loggedIn: false,
//       intuitions: [
//         { title: "Intuition One", body: "Body One", id: 1 },
//         { title: "Intuition Two", body: "Body Two", id: 2 },
//         { title: "Intuition Three", body: "Body Three", id: 3 },
//         { title: "Intuition Four", body: "Body Four", id: 4 },
//         { title: "Intuition  Five", body: "Body Five", id: 5 },
//         { title: "Intuition Six", body: "Body Six", id: 6 }
//       ]
//     };

//     // => FORM HANDLING
//     this.handleEmail = this.handleEmail.bind(this);
//     this.handlePassword = this.handlePassword.bind(this);

//     // => LOGIN AND LOGOUT
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.signup = this.signup.bind(this);
//     this.signin = this.signin.bind(this);
//     this.signout = this.signout.bind(this);

//     // => CRUD FOR INTUITIONS
//     this.addIntuition = this.addIntuition.bind(this);
//     this.deleteIntuition = this.deleteIntuition.bind(this);

//     // => TEST API
//     this.testButton = this.testButton.bind(this);
//   }

//   // componentDidMount() {
//   //   fetch("/testProtected")
//   //     .then(res => {
//   //       return res.json();
//   //     })
//   //     .then(res => {
//   //       alert(res.hi);
//   //     });
//   // }

//   addIntuition(intuition) {
//     this.setState({ intuitions: this.state.intuitions.concat(intuition) });
//   }

//   deleteIntuition(id) {
//     this.setState({
//       intuitions: this.state.intuitions.filter(el => el.id !== id)
//     });
//   }

//   handleEmail(e) {
//     this.setState({ email: e.target.value });
//   }
//   handlePassword(e) {
//     this.setState({ password: e.target.value });
//   }

//   handleSubmit() {
//     this.setState({ loggedIn: true });
//   }

//   signup(e) {
//     e.preventDefault();
//     const { email } = this.state;
//     const { password } = this.state;
//     fetch("/signup", {
//       body: JSON.stringify({ email: email, password: password }),
//       cache: "no-cache",
//       headers: {
//         "content-type": "application/json"
//       },
//       method: "POST"
//     })
//       .then(res => res.json())
//       .then(res => alert(res.token));
//     this.handleSubmit();
//   }

//   signin(e) {
//     e.preventDefault();
//     const { email } = this.state;
//     const { password } = this.state;

//     fetch("/signin", {
//       body: JSON.stringify({ email: email, password: password }),
//       cache: "no-cache",
//       headers: {
//         "content-type": "application/json"
//       },
//       method: "POST"
//     });
//     this.handleSubmit();
//   }

//   signout(e) {
//     e.preventDefault();
//     fetch("/signout", {
//       method: "GET"
//     });
//     this.setState({ loggedIn: false });
//   }

//   testButton(e) {
//     e.preventDefault();
//     fetch("/testCookie", {
//       method: "GET"
//     });
//   }

//   render() {
//     return (
//       <div>
//         <NavBar />
//         {children}
//       </div>
//     );

//     if (this.state.loggedIn) {
//       return (
//         <div>
//           <button onClick={this.testButton}>Test</button>
//           <NavBar isLoggedIn={this.state.loggedIn} signOut={this.signout} />
//           <div className="mainContainer">
//             <IntuitionsBoard
//               intuitions={this.state.intuitions}
//               handleAdd={this.addIntuition}
//               handleDelete={this.deleteIntuition}
//             />
//           </div>
//         </div>
//       );
//     }
//     return (
//       <div>
//         <button onClick={this.testButton}>Test</button>
//         <NavBar isLoggedIn={this.state.loggedIn} />
//         <div className="entryContainer">
//           <EntryBox
//             email={this.state.email}
//             password={this.state.password}
//             emailChange={this.handleEmail}
//             passwordChange={this.handlePassword}
//             signup={this.signup}
//             signin={this.signin}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
