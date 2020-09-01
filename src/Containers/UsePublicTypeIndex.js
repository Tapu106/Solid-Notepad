import React from "react";
import { TripleDocument } from "tripledoc";
import FetchPublicTypeIndex from "../services/FetchPublicTypeIndex";

const usePublicTypeIndex = () => {
  const [publicTypeIndex, setPublicTypeIndex] = React.useState();

  React.useEffect(() => {
    FetchPublicTypeIndex().then((fetchedPublicTypeIndex) => {
      if (fetchedPublicTypeIndex === null) {
        return;
      }
      setPublicTypeIndex(fetchedPublicTypeIndex);
    });
  }, []);

  return publicTypeIndex;
};

export default usePublicTypeIndex;
