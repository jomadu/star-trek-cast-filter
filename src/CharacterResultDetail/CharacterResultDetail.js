import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useGetCharacter } from "../utils";

const CharacterResultDetail = ({ uid }) => {
  const [data, isLoading, error, setUid] = useGetCharacter(uid);

  useEffect(() => {
    setUid(uid);
  }, [uid]);

  var renderedComponent;
  if (error) {
    renderedComponent = <p>{error}</p>;
  } else if (isLoading) {
    renderedComponent = <p>loading...</p>;
  } else if (data) {
    renderedComponent = (
      <p>
        Name: {data.character.name}, Serial Number:
        {data.character.serialNumber}
      </p>
    );
  }

  return <div>{renderedComponent}</div>;
};

CharacterResultDetail.propTypes = {
  uid: PropTypes.string,
};

export default CharacterResultDetail;
