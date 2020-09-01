import React, { Component } from "react";
import Footer from "./Footer";
import NoteList from "./NoteList";
import { foaf } from "rdf-namespaces";
import fetchProfile from "../services/FetchProfile";

class DashBoard extends Component {
  state = {
    solidProfile: null,
  };

  componentDidMount() {
    fetchProfile()
      .then((profileDoc) => {
        this.setState({ solidProfile: profileDoc });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const profile = this.state.solidProfile;
    const name = profile ? profile.getString(foaf.name) : null;
    const title = name ? `Public notes by ${name}` : "Public notes";

    return (
      <>
        <section className="section">
          <h1 className="title">{title}</h1>
          <NoteList />
        </section>
        <Footer />
      </>
    );
  }
}

export default DashBoard;
