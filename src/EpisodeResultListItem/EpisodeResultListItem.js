import React from "react";
import PropTypes from "prop-types";
import { useGetEpisode } from "../utils";

const EpisodeResultListItem = ({ uid }) => {
  const [episode, isLoading, error] = useGetEpisode(uid);

  var renderedComponent;
  if (error) {
    renderedComponent = <p>{error}</p>;
  } else if (isLoading) {
    renderedComponent = <p>loading</p>;
  } else {
    renderedComponent = <p>{JSON.stringify(episode)}</p>;
  }

  return <div>{renderedComponent}</div>;
};

EpisodeResultListItem.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default EpisodeResultListItem;
