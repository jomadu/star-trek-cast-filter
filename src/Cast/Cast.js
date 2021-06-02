import React from "react";
import PropTypes from "prop-types";

const Cast = ({ characters, onRemoveCharacter }) => {
  const handleClick = () => {
    if (characters.length > 0) {
      onRemoveCharacter(characters[characters.length - 1]);
    }
  };
  return (
    <div>
      <button onClick={handleClick}>Remove</button>
    </div>
  );
};

Cast.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.number).isRequired,
  onRemoveCharacter: PropTypes.func.isRequired,
};

export default Cast;
