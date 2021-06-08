import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useGetCharacters } from "../utils";
import Pagination, { usePagination } from "../Pagination/Pagination";
import EpisodeResultListItem from "../EpisodeResultListItem/EpisodeResultListItem";
import EpisodeResultDetail from "../EpisodeResultDetail/EpisodeResultDetail";

const Episodes = ({ characterUids }) => {
  // Searching
  const [
    characterData,
    characterDataIsLoading,
    characterDataError,
    setCharacterUids,
  ] = useGetCharacters(characterUids);

  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    setCharacterUids(characterUids);
  }, [characterUids, setCharacterUids]);

  useEffect(() => {
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

  // Pagination
  const {
    pageData,
    currentPage,
    numPages,
    pageGroup,
    setData,
    goToPage,
    goToFirstPage,
    goToLastPage,
    goToPreviousPage,
    goToNextPage,
  } = usePagination(null, 5, 3);

  useEffect(() => {
    setData(episodes);
  }, [episodes, setData]);

  // Selection
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    setSelectedRow(null);
  }, [pageData, currentPage, numPages, pageGroup]);

  const handleSelectResultListItem = (row) => () => setSelectedRow(row);

  // Components
  const getEpisodesListComp = () => {
    var results;
    results = (
      <div>
        <ul>
          {pageData.map((uid, idx) => (
            <EpisodeResultListItem
              uid={uid}
              onSelect={handleSelectResultListItem(idx)}
              selected={idx === selectedRow}
              key={uid}
            />
          ))}
        </ul>
        <Pagination
          pageGroup={pageGroup}
          currentPage={currentPage}
          onGoToPageClicked={goToPage}
          onGoToFirstPageClicked={goToFirstPage}
          onGoToLastPageClicked={goToLastPage}
          onGoToPreviousPageClicked={goToPreviousPage}
          onGoToNextPageClicked={goToNextPage}
        />
      </div>
    );
    return results;
  };

  const getSelectedEpisodeDetailsComp = () => {
    if (selectedRow === null) {
      return null;
    } else {
      return <EpisodeResultDetail uid={pageData[selectedRow]} />;
    }
  };

  return (
    <div>
      <h2>Episodes</h2>
      {getEpisodesListComp()}
      {getSelectedEpisodeDetailsComp()}
    </div>
  );
};

Episodes.propTypes = {
  characterUids: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Episodes;
