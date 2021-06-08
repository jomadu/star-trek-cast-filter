import React from "react";
import PropTypes from "prop-types";
import CharacterResultDetail from "../CharacterResultDetail/CharacterResultDetail";

const CharacterAvatar = ({ uid, onRemove }) => {
  return (
    <div>
      <CharacterResultDetail uid={uid} />
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
