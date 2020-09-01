import React, { Component } from "react";
import { LoggedOut, LoginButton, LoggedIn } from "@solid/react";
import DashBoard from './Components/DashBoard';
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <LoggedOut>
          <section className="section">
            <p className="content">
              Please connect to your Pod to start taking notes.
            </p>
            <p className="content">
              <LoginButton
                popup="popup.html"
                className="button is-large is-primary"
              >
                Connect
              </LoginButton>
            </p>
          </section>
        </LoggedOut>
        <LoggedIn>
          <DashBoard />
        </LoggedIn>
      </>
    );
  }
}

export default App;
