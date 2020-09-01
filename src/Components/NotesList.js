import React from "react";
import UseNotesList, { getNotes } from "../Containers/UseNotesList";
import { schema } from "rdf-namespaces";

const notesList = () => {
  const updatedNotesList = UseNotesList();

  if (!updatedNotesList) {
    return null;
  }
  const notes = getNotes(updatedNotesList);
  console.log(notes);

  const noteElements = notes.sort(byDate).map((note) => (
    <article key={note.asRef()} className="card content">
      <pre>{note.getString(schema.text)}</pre>
    </article>
  ));

  return <section className="section">{noteElements}</section>;
};

export default notesList;

function byDate(note1, note2) {
  const date1 = note1.getDateTime(schema.dateCreated);
  const date2 = note2.getDateTime(schema.dateCreated);
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    return 0;
  }

  return date2.getTime() - date1.getTime();
}
