import React from "react";
import PropTypes from "prop-types";
import { useFetchEpisode } from "../utils";

const EpisodeResultListItem = ({ uid }) => {
  console.log("heyo");
  const [response, error, isLoading] = useFetchEpisode(uid);

  var renderedComponent;
  if (error) {
    renderedComponent = <p>error</p>;
  } else if (isLoading) {
    renderedComponent = <p>loading</p>;
  } else {
    renderedComponent = <p>{JSON.stringify(response)}</p>;
  }

  return <div>{renderedComponent}</div>;
};

EpisodeResultListItem.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default EpisodeResultListItem;
