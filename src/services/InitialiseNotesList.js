import FetchProfile from "../services/FetchProfile";
import PublicTypeIndex from "../services/FetchPublicTypeIndex";
import { createDocument } from "tripledoc";
import { space, rdf, solid, schema } from "rdf-namespaces";

const initialiseNotesList = async () => {
  const profile = FetchProfile();
  const publicTypeIndex = PublicTypeIndex();
  const [updatedProfile, updatedPublicTypeIndex] = [profile, publicTypeIndex];

  // Get the root URL of the user's Pod:
  const storage = updatedProfile.getRef(space.storage);

  // Decide at what URL within the user's Pod the new Document should be stored:
  const notesListRef = storage + "public/notes.ttl";

  // Create the new Document:
  const notesList = createDocument(notesListRef);
  await notesList.save();

  // Store a reference to that Document in the public Type Index for `schema:TextDigitalDocument`:
  const typeRegistration = updatedPublicTypeIndex.addSubject();
  typeRegistration.addRef(rdf.type, solid.TypeRegistration);
  typeRegistration.addRef(solid.instance, notesList.asRef());
  typeRegistration.addRef(solid.forClass, schema.TextDigitalDocument);
  await updatedPublicTypeIndex.save([typeRegistration]);

  // And finally, return our newly created (currently empty) notes Document:
  return notesList;
};

export default initialiseNotesList;
