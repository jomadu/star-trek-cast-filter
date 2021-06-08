import React from "react";
import PropTypes from "prop-types";
import { useGetCharacter } from "../utils";

const CharacterResultListItem = ({ uid, selected, onSelect }) => {
  const [data, isLoading, error] = useGetCharacter(uid);

  var text;
  if (error) {
    text = "Error";
  } else if (isLoading) {
    text = "Loading ...";
  } else if (data) {
    text = `${data.character.name} - ${
      data.character.episodes.length
    } episodes ${selected ? " *" : ""}`;
  }

  return <li onClick={() => onSelect(uid)}>{text}</li>;
};

CharacterResultListItem.propTypes = {
  uid: PropTypes.string,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default CharacterResultListItem;
