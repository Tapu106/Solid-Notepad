import fetchProfile from "../services/FetchProfile";
import { fetchDocument } from "tripledoc";
import { solid } from "rdf-namespaces";

const FetchPublicTypeIndex = async () => {
  const profile = await fetchProfile();
  if (!profile) {
    return null;
  }
  const publicTypeIndexRef = profile.getRef(solid.publicTypeIndex);

  if (!publicTypeIndexRef) {
    return null;
  }
  const document = await fetchDocument(publicTypeIndexRef);
  return document;
};

export default FetchPublicTypeIndex;
