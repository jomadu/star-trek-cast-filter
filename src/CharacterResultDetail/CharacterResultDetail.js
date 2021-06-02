import React from "react";
import PropTypes from "prop-types";
import { getCharacterWithId } from "../utils";

const CharacterResultDetail = ({id}) => {
  const character = getCharacterWithId(id);

  return (
    <div>
      <p>id: {character.id}, name: {character.characterName}</p>
    </div>
  );
};

CharacterResultDetail.propTypes = {
  id = PropTypes.number
};

export default CharacterResultDetail;
