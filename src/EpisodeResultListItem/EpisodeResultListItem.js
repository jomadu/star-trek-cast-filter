import React from "react";
import PropTypes from "prop-types";
import { useGetEpisode } from "../utils";

const EpisodeResultListItem = ({ uid, selected, onSelect }) => {
  const [episode, isLoading, error] = useGetEpisode(uid);

  const handleClick = () => onSelect();

  var renderedComponent;
  if (error) {
    renderedComponent = <p>{error}</p>;
  } else if (isLoading) {
    renderedComponent = <p>loading</p>;
  } else if (episode) {
    renderedComponent = (
      <p>
        {episode.episode.title}
        {selected && " *"}
      </p>
    );
  }

  return <div onClick={handleClick}>{renderedComponent}</div>;
};

EpisodeResultListItem.propTypes = {
  uid: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default EpisodeResultListItem;
