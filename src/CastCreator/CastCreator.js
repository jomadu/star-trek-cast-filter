import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSearchCharacter } from "../utils";
import CharacterResultListItem from "../CharacterResultListItem/CharacterResultListItem";
import CharacterResultDetail from "../CharacterResultDetail/CharacterResultDetail";
import Pagination, { usePagination } from "../Pagination/Pagination";
import CharacterAvatar from "../CharacterAvatar/CharacterAvatar";

const CastCreator = ({
  characterUids,
  onAddCharacterUid,
  onRemoveCharacterUid,
}) => {
  // Searching
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, isLoading, error, name, setName] =
    useSearchCharacter(searchTerm);

  const handleSearchTermChanged = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    setName(searchTerm);
    event.preventDefault();
  };

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

  // We're paginating the search results, so whenever the search results change,
  // we need to update the data using setData
  useEffect(() => {
    setData(searchResults?.characters.map((c) => c.uid));
  }, [searchResults, setData]);

  // The Pagination
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

  const handleSelect = (row) => () => {
    if (row === selectedRow) {
      setSelectedRow(null);
    } else {
      setSelectedRow(row);
    }
  };

  // Adding and Removal of Characters
  const handleAddCharacter = (uid) => () => onAddCharacterUid(uid);
  const handleRemoveCharacter = (uid) => () => onRemoveCharacterUid(uid);

  // Components
  const getSearchResultsComp = () => {
    var title;
    var results;
    if (error) {
      title = <h2>Error when searching: "{name}"</h2>;
    } else if (isLoading) {
      title = <h2>Searching for "{name}" ...</h2>;
    } else {
      title = <h2>Results for "{name}":</h2>;
      results = (
        <div>
          <ul>
            {pageData.map((uid, idx) => (
              <CharacterResultListItem
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
    }
    return (
      <div>
        {title}
        {results}
      </div>
    );
  };

  const getSelectedResultDetailsComp = () => {
    return selectedRow !== null ? (
      <div>
        <CharacterResultDetail uid={pageData[selectedRow]} />
        <button
          type="button"
          value="Add"
          onClick={handleAddCharacter(pageData[selectedRow])}
        >
          Add
        </button>
      </div>
    ) : null;
  };

  const getCastComp = () => {
    return (
      <div>
        <h3>Cast:</h3>
        {characterUids.map((uid) => (
          <CharacterAvatar
            uid={uid}
            onRemove={handleRemoveCharacter(uid)}
            key={uid}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChanged}
        />
        <button type="submit">Search</button>
      </form>
      {getSearchResultsComp()}
      {getSelectedResultDetailsComp()}
      {getCastComp()}
    </div>
  );
};

CastCreator.propTypes = {
  characterUids: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddCharacterUid: PropTypes.func.isRequired,
  onRemoveCharacterUid: PropTypes.func.isRequired,
};

export default CastCreator;
