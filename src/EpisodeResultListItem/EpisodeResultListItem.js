import React from "react";
import PropTypes from "prop-types";
import { useGetEpisode } from "../utils";

const EpisodeResultListItem = ({ uid, selected, onSelect }) => {
  const [episode, isLoading, error] = useGetEpisode(uid);

  const handleClick = () => onSelect();

  var text;
  if (error) {
    text = "Error.";
  } else if (isLoading) {
    text = "Loading...";
  } else if (episode) {
    text = `${episode.episode.series.title} - S${
      episode.episode.seasonNumber
    }E${episode.episode.episodeNumber} - ${episode.episode.title}${
      selected ? " *" : ""
    }`;
  }

  return <div onClick={handleClick}>{text}</div>;
};

EpisodeResultListItem.propTypes = {
  uid: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default EpisodeResultListItem;
