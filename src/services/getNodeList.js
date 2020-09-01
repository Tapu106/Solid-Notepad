import React from "react";
import { fetchDocument } from "tripledoc";
import { solid, schema } from "rdf-namespaces";
import fetchProfile from "../services/FetchProfile";
import initialiseNotesList from "./initialNotesList";

const getNodeList = async () => {
  const profile = fetchProfile();
  if (profile === null) {
    return null;
  }

  const publicTypeIndexRef = profile.getRef(solid.publicTypeIndex);
  if (!publicTypeIndexRef) {
    return null;
  }
  const publicTypeIndex = await fetchDocument(publicTypeIndexRef);
  const notesListEntry = publicTypeIndex.findSubject(
    solid.forClass,
    schema.TextDigitalDocument
  );

  /* 2. If it doesn't exist, create it. */
  if (notesListEntry === null) {
    // We will define this function later:
    return initialiseNotesList(profile, publicTypeIndex);
  }

  /* 3. If it does exist, fetch that Document. */
  const notesListRef = notesListEntry.getRef(solid.instance);
  return await fetchDocument(notesListRef);
};

export default getNodeList;
