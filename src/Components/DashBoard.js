import React, { Component } from "react";
import Footer from "./Footer";
import NotesList from "./NotesList";
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
    const title = name ? `Hi, Welcome!! ${name}. Start taking notes right now!!` : "Hi, Welcome!!";
    const role = profile ? profile.getString('http://www.w3.org/2006/vcard/ns#role') : 'Loading...';

    return (
      <>
        <section className="section">
          <h1 className="title">{title}</h1>
          <h2 className="title">{`Role: ${role}`}</h2>
          <NotesList />
        </section>
        <Footer />
      </>
    );
  }
}

export default DashBoard;
