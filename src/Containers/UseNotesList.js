import React from "react";
import usePublicTypeIndex from "./UsePublicTypeIndex";
import { solid, schema } from "rdf-namespaces";
import { fetchDocument } from "tripledoc";
import InitialiseNotesList from "../services/InitialiseNotesList";

const useNotesList = () => {
  const publicTypeIndex = usePublicTypeIndex();
  const [updatedNotesList, setUpdatedNotesList] = React.useState();

  React.useEffect(() => {
    if (!publicTypeIndex) {
      return;
    }

    (async () => {
      const notesListEntry = publicTypeIndex.findSubject(
        solid.forClass,
        schema.TextDigitalDocument
      );
      if (!notesListEntry) {
        const notesList = await InitialiseNotesList();
        if (notesList === null) {
          return;
        }
        setUpdatedNotesList(notesList);
        return;
      } else {
        const notesListRef = notesListEntry.getRef(solid.instance);
        if (typeof notesListRef !== "string") {
          return;
        }

        const document = await fetchDocument(notesListRef);
        setUpdatedNotesList(document);
      }
    })();
  }, [publicTypeIndex]);

  return updatedNotesList;
};

export default useNotesList;

export function getNotes(updatedNotesList) {
  return updatedNotesList.getSubjectsOfType(schema.TextDigitalDocument);
}
