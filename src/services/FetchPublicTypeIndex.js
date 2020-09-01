import FetchProfile from "../services/FetchProfile";
import { solid } from "rdf-namespaces";
import { fetchDocument } from "tripledoc";

const fetchPublicTypeIndex = async () => {
  const profile = await FetchProfile();

  if (!profile) {
    return null;
  }
  const publicTypeIndexRef = profile.getRef(solid.publicTypeIndex);

  if (!publicTypeIndexRef || typeof publicTypeIndexRef !== "string") {
    return null;
  }

  const publicTypeIndex = await fetchDocument(publicTypeIndexRef);

  return publicTypeIndex;
};

export default fetchPublicTypeIndex;
