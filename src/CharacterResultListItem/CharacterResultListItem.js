import React from "react";
import PropTypes from "prop-types";
import { getCharacterWithId } from "../utils";

const CharacterResultListItem = ({ id, selected, onSelect }) => {
  const character = getCharacterWithId(id);
  return (
    <div>
      <p onClick={onSelect}>
        id: {character.id}, name: {character.characterName}
      </p>
    </div>
  );
};

CharacterResultListItem.propTypes = {
  id: PropTypes.number,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default CharacterResultListItem;
