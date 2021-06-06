import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useGetCharacters, useGetEpisode, usePagination } from "../utils";
import Pagination from "../Pagination/Pagination";
import EpisodeResultListItem from "../EpisodeResultListItem/EpisodeResultListItem";

const Episodes = ({ characters }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [
    characterData,
    characterDataIsLoading,
    characterDataError,
    setCharacterUids,
  ] = useGetCharacters(characters);
  const [episode, episodeIsLoading, episodeError, setUid] = useGetEpisode(null);

  const {
    pageData,
    currentPage,
    numPages,
    pageGroup,
    setData,
    setItemsPerPage,
    setPageGroupLimit,
    goToPage,
    goToFirstPage,
    goToLastPage,
    goToPreviousPage,
    goToNextPage,
  } = usePagination(null, 5, 3);

  useEffect(() => {
    setSelectedRow(null);
  }, [pageData, currentPage, numPages, pageGroup]);

  useEffect(() => {
    setData(episodes);
  }, [episodes]);

  useEffect(() => {
    setCharacterUids(characters);
  }, [characters, setCharacterUids]);

  useEffect(() => {
    setSelectedRow(null);
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
    if (pageData.length > selectedRow) {
      setUid(pageData[selectedRow]);
    }
  }, [selectedRow, setUid]);

  const handleSelectResultListItem = (row) => () => setSelectedRow(row);

  const getEpisodes = () => {
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

  var detailComp;
  if (selectedRow) {
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
      {getEpisodes()}
      {detailComp}
    </div>
  );
};

Episodes.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Episodes;
