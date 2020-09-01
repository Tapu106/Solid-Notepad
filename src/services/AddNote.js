import { rdf, schema } from "rdf-namespaces";

const addNote = async (note, notesList) => {
  const newNote = notesList.addSubject();
  newNote.addRef(rdf.type, schema.TextDigitalDocument);
  newNote.addString(schema.text, note);
  newNote.addDateTime(schema.dateCreated, new Date(Date.now()));

  return await notesList.save([newNote]);
};

export default addNote;
