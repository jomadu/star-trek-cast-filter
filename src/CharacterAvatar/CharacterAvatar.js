import React from "react";
import PropTypes from "prop-types";
import { useGetCharacter } from "../utils";

const CharacterAvatar = ({ uid, onRemove }) => {
  const [data, isLoading, error] = useGetCharacter(uid);

  var text;
  if (error) {
    text = "Error.";
  } else if (isLoading) {
    text = "Loading...";
  } else if (data) {
    text = `Name: ${data.character.name}, Serial Number: ${data.character.serialNumber}`;
  }

  return (
    <div>
      <p>{text}</p>
      <button type="button" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
};

CharacterAvatar.propTypes = {
  uid: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CharacterAvatar;
