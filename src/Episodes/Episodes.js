import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Episodes = ({ characters }) => {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    if (selectedEpisode !== null && !characters.includes(selectedEpisode)) {
      setSelectedEpisode(null);
    }
  }, [selectedEpisode, characters, setSelectedEpisode]);

  const episodeListItems = characters.map((id) => (
    <li onClick={() => setSelectedEpisode(id)} key={id}>
      {id}
    </li>
  ));

  return (
    <div>
      <h2>Episodes</h2>
      <ul>{episodeListItems}</ul>
      {selectedEpisode && <p>{selectedEpisode}</p>}
    </div>
  );
};

Episodes.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Episodes;
