import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useGetEpisode } from "../utils";

const EpisodeResultDetail = ({ uid }) => {
  const [data, isLoading, error, setUid] = useGetEpisode(uid);

  useEffect(() => {
    setUid(uid);
  }, [uid, setUid]);

  var text;
  if (error) {
    text = "Error";
  } else if (isLoading) {
    text = "Loading...";
  } else if (data) {
    text = `Title: ${data.episode.title}`;
  }

  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

EpisodeResultDetail.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default EpisodeResultDetail;
