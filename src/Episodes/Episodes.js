import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useGetCharacters } from "../utils";
import Pagination, { usePagination } from "../Pagination/Pagination";
import EpisodeResultListItem from "../EpisodeResultListItem/EpisodeResultListItem";
import EpisodeResultDetail from "../EpisodeResultDetail/EpisodeResultDetail";

const Episodes = ({ characterUids }) => {
  // Searching
  const [characterData, isLoading, error, setUids] =
    useGetCharacters(characterUids);

  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    setUids(characterUids);
  }, [characterUids, setUids]);

  useEffect(() => {
    setEpisodes([]);
    if (!error && !isLoading && characterData) {
      var episodeCounter = {};
      characterData.forEach((d) => {
        d.character.episodes.forEach((e) => {
          if (!(e.uid in episodeCounter)) {
            episodeCounter[e.uid] = 0;
          }
          episodeCounter[e.uid] += 1;
        });
      });

      var characterEpisodesInnerJoin = [];
      Object.keys(episodeCounter).forEach((e) => {
        if (episodeCounter[e] === characterData.length) {
          characterEpisodesInnerJoin.push(e);
        }
      });
      setEpisodes(characterEpisodesInnerJoin);
    }
  }, [characterData, isLoading, error]);

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

  const paginationComp = (
    <Pagination
      pageGroup={pageGroup}
      currentPage={currentPage}
      onGoToPageClicked={goToPage}
      onGoToFirstPageClicked={goToFirstPage}
      onGoToLastPageClicked={goToLastPage}
      onGoToPreviousPageClicked={goToPreviousPage}
      onGoToNextPageClicked={goToNextPage}
    />
  );

  // Selection
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    setSelectedRow(null);
  }, [pageData, currentPage, numPages, pageGroup]);

  const handleSelect = (row) => () => setSelectedRow(row);

  // Components
  const getListComp = () => {
    var title;
    var results;
    if (error) {
      title = <h3>Error when searching for episodes.</h3>;
    } else if (isLoading) {
      title = <h3>Searching for episodes with your cast ...</h3>;
    } else if (characterData === null) {
      title = <h3>No episodes to binge yet. Try adding some cast members!</h3>;
    } else if (characterData !== null) {
      if (pageData.length) {
        title = <h3>Episodes with your cast:</h3>;
        results = (
          <div>
            <ul>
              {pageData.map((uid, idx) => (
                <EpisodeResultListItem
                  uid={uid}
                  onSelect={handleSelect(idx)}
                  selected={idx === selectedRow}
                  key={uid}
                />
              ))}
            </ul>
            {paginationComp}
          </div>
        );
      } else {
        title = <h3>There are no episodes that have your entire cast.</h3>;
      }
    }
    return (
      <div>
        {title}
        {results}
      </div>
    );
  };

  const getDetailComp = () => {
    if (
      selectedRow !== null &&
      selectedRow >= 0 &&
      selectedRow < pageData.length
    ) {
      return (
        <div>
          <h3>Episode Details:</h3>
          <EpisodeResultDetail uid={pageData[selectedRow]} />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <h2>Episodes</h2>
      {getListComp()}
      {getDetailComp()}
    </div>
  );
};

Episodes.propTypes = {
  characterUids: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Episodes;
