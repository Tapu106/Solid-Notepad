import React from "react";
import FetchPublicTypeIndex from "../services/FetchPublicTypeIndex";

const usePublicTypeIndex = () => {
  const [publicTypeIndex, setPublicTypeIndex] = React.useState();

  React.useEffect(() => {
    FetchPublicTypeIndex().then((fetchedIndex) => {
      if (fetchedIndex === null) {
        return;
      }

      setPublicTypeIndex(fetchedIndex);
    });
  }, []);

  return publicTypeIndex;
};

export default usePublicTypeIndex;
