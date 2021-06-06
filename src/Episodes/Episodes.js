import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useGetCharacters, useGetEpisode } from "../utils";
import EpisodeResultListItem from "../EpisodeResultListItem/EpisodeResultListItem";

const Episodes = ({ characters }) => {
  const [selected, setSelected] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [
    characterData,
    characterDataIsLoading,
    characterDataError,
    setCharacterUids,
  ] = useGetCharacters(characters);
  const [episode, episodeIsLoading, episodeError, setUid] = useGetEpisode(null);

  useEffect(() => {
    setCharacterUids(characters);
  }, [characters, setCharacterUids]);

  useEffect(() => {
    setSelected(null);
    setEpisodes([]);
    if (characterDataError) {
      console.log("error");
    } else if (characterDataIsLoading) {
      console.log("loading");
    } else if (characterData) {
      var counter = {};
      characterData.forEach((d) => {
        d.character.episodes.forEach((e) => {
          if (!(e.uid in counter)) {
            counter[e.uid] = 0;
          }
          counter[e.uid] += 1;
        });
      });

      var joined = [];
      Object.keys(counter).forEach((e) => {
        if (counter[e] === characterData.length) {
          joined.push(e);
        }
      });
      setEpisodes(joined);
    }
  }, [characterData, characterDataIsLoading, characterDataError]);

  useEffect(() => {
    setUid(selected);
  }, [selected, setUid]);

  const handleSelectResultListItem = (uid) => () => setSelected(uid);

  var resultsComp;
  if (episodes.length > 0) {
    resultsComp = (
      <ul>
        {episodes.map((uid) => (
          <li key={uid}>
            <EpisodeResultListItem
              uid={uid}
              onSelect={handleSelectResultListItem(uid)}
              selected={uid === selected}
            />
          </li>
        ))}
      </ul>
    );
  }

  var detailComp;
  if (selected) {
    if (episodeError) {
      detailComp = <p>{episodeError}</p>;
    } else if (episodeIsLoading) {
      detailComp = <p>loading...</p>;
    } else if (episode) {
      detailComp = <p>{episode.episode.title}</p>;
    }
  }

  return (
    <div>
      <h2>Episodes</h2>
      {resultsComp}
      {detailComp}
    </div>
  );
};

Episodes.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Episodes;
