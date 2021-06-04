import React from "react";
import PropTypes from "prop-types";
import { useGetCharacter } from "../utils";

const CharacterResultListItem = ({ uid, selected, onSelect }) => {
  const [data, isLoading, error] = useGetCharacter(uid);

  const handleClick = () => onSelect(uid);

  var renderedComponent;
  if (error) {
    renderedComponent = <p>{error}</p>;
  } else if (isLoading) {
    renderedComponent = <p>loading...</p>;
  } else if (data) {
    console.log(data);
    renderedComponent = (
      <p>
        {data.character.name}, {data.character.episodes.length} episodes
        {selected ? " *" : ""}
      </p>
    );
  }

  return <div onClick={handleClick}>{renderedComponent}</div>;
};

CharacterResultListItem.propTypes = {
  uid: PropTypes.string,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default CharacterResultListItem;
