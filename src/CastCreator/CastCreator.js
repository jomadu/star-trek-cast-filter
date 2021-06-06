import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSearchCharacter, usePagination } from "../utils";
import CharacterResultListItem from "../CharacterResultListItem/CharacterResultListItem";
import CharacterResultDetail from "../CharacterResultDetail/CharacterResultDetail";
import CharacterResultList from "../CharacterResultList/CharacterResultList";
import Pagination from "../Pagination/Pagination";
import CharacterAvatar from "../CharacterAvatar/CharacterAvatar";

const CastCreatorOld = ({ characters, onAddCharacter, onRemoveCharacter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, isLoading, error, name, setName] =
    useSearchCharacter(searchTerm);
  const [selected, setSelected] = useState("");

  console.log(searchResults);

  const handleSearchTermChanged = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    setName(searchTerm);
    event.preventDefault();
  };

  const handleOnSelectSearchResult = (uid) => () => setSelected(uid);
  const handleAddCharacter = (uid) => () => onAddCharacter(uid);
  const handleRemoveCharacter = (uid) => () => onRemoveCharacter(uid);

  var searchResultsTitleComp;
  var searchResultsComp;
  if (error) {
    searchResultsTitleComp = <p>{error}</p>;
  } else if (isLoading) {
    searchResultsTitleComp = <h2>Searching for: "{name}"</h2>;
    searchResultsComp = <p>loading...</p>;
  } else {
    searchResultsTitleComp = <h2>Search Results for: "{name}"</h2>;
    searchResultsComp = (
      <div>
        {searchResults && (
          <ul>
            {searchResults.characters.map((c) => (
              <li key={c.uid}>
                <CharacterResultListItem
                  uid={c.uid}
                  onSelect={handleOnSelectSearchResult(c.uid)}
                  selected={selected === c.uid}
                />
                <button
                  type="button"
                  value="Add"
                  onClick={handleAddCharacter(c.uid)}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  var detailsComp;
  if (selected) {
    detailsComp = <CharacterResultDetail uid={selected} />;
  }

  const castComp = (
    <ul>
      {characters.map((uid) => (
        <li key={uid}>
          <p>{uid}</p>
          <button
            type="button"
            value="Remove"
            onClick={handleRemoveCharacter(uid)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );

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
      {searchResultsTitleComp}
      <CharacterResultList />
      {detailsComp}
      <h2>Cast</h2>
      {castComp}
    </div>
  );
};

const CastCreator = ({ characters, onAddCharacter, onRemoveCharacter }) => {
  // state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, isLoading, error, name, setName] =
    useSearchCharacter(searchTerm);
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
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    setSelectedRow(null);
  }, [currentPage]);

  const handleSearchTermChanged = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    setName(searchTerm);
    event.preventDefault();
  };

  const handleSelected = (row) => () => {
    console.log(`selected row: ${row}`);
    if (row == selectedRow) {
      setSelectedRow(null);
    } else {
      setSelectedRow(row);
    }
  };

  const handleAddCharacter = (uid) => () => onAddCharacter(uid);
  const handleRemoveCharacter = (uid) => () => onRemoveCharacter(uid);

  // When searchResults changes, update the data
  useEffect(() => {
    setData(searchResults?.characters.map((c) => c.uid));
  }, [searchResults]);

  const getSearchResultsComp = () => {
    var title;
    var results;
    if (error) {
      title = <h2>Error when searching: "{name}"</h2>;
    } else if (isLoading) {
      title = <h2>Searching for "{name}" ...</h2>;
    } else if (searchResults) {
      title = <h2>Results for "{name}":</h2>;
      results = (
        <div>
          <ul>
            {pageData.map((uid, idx) => (
              <CharacterResultListItem
                uid={uid}
                onSelect={handleSelected(idx)}
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
    }
    return (
      <div>
        {title}
        {results}
      </div>
    );
  };

  const getDetailsComp = () => {
    return selectedRow ? (
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
    return characters.map((uid) => (
      <CharacterAvatar
        uid={uid}
        onRemove={handleRemoveCharacter(uid)}
        key={uid}
      />
    ));
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
      {getDetailsComp()}
      {getCastComp()}
    </div>
  );
};

CastCreator.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddCharacter: PropTypes.func.isRequired,
  onRemoveCharacter: PropTypes.func.isRequired,
};

export default CastCreator;
