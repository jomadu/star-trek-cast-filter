import React from "react";
import PropTypes from "prop-types";

const Adder = ({ characters, onAddCharacter }) => {
  const handleClick = () => {
    onAddCharacter(characters.length);
  };

  const handleSearch = () => {
    //fetch
  };
  return (
    <div>
      <form onSubmit={handleSearch}></form>
      <button onClick={handleClick}>Add</button>
    </div>
  );
};

Adder.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.number).isRequired,
  onAddCharacter: PropTypes.func.isRequired,
};

export default Adder;
