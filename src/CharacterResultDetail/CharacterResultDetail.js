import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useGetCharacter } from "../utils";

const CharacterResultDetail = ({ uid }) => {
  const [data, isLoading, error, setUid] = useGetCharacter(uid);

  useEffect(() => {
    setUid(uid);
  }, [uid, setUid]);

  var text;
  if (error) {
    text = "Error";
  } else if (isLoading) {
    text = "Loading...";
  } else if (data) {
    text = `Name: ${data.character.name}, Serial Number: ${data.character.serialNumber}`;
  }

  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

CharacterResultDetail.propTypes = {
  uid: PropTypes.string,
};

export default CharacterResultDetail;
