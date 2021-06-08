import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSearchCharacter } from "../utils";
import CharacterResultListItem from "../CharacterResultListItem/CharacterResultListItem";
import CharacterResultDetail from "../CharacterResultDetail/CharacterResultDetail";
import Pagination, { usePagination } from "../Pagination/Pagination";
import CharacterAvatar from "../CharacterAvatar/CharacterAvatar";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
const StyledListItem = styled.li`
  padding-top: 5px;
  padding-bottom: 5px;
  :hover {
    background-color: lightblue;
  }
`;

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
      numPages={numPages}
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
  const getListComp = () => {
    var title;
    var results;
    if (error) {
      title = <h3>Error when searching for character "{name}"</h3>;
    } else if (isLoading) {
      title = <h3>Searching for character "{name}" ...</h3>;
    } else if (searchResults !== null) {
      if (pageData.length) {
        title = <h3>Characters matching "{name}":</h3>;
        results = (
          <div>
            <StyledList>
              {pageData.map((uid, idx) => (
                <StyledListItem key={uid}>
                  <CharacterResultListItem
                    uid={uid}
                    onSelect={handleSelect(idx)}
                    selected={idx === selectedRow}
                  />
                </StyledListItem>
              ))}
            </StyledList>
            {paginationComp}
          </div>
        );
      } else {
        title = <h3>No search results for "{name}"</h3>;
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
          <h3>Selected Character Details:</h3>
          <CharacterResultDetail uid={pageData[selectedRow]} />
          <button
            type="button"
            value="Add"
            onClick={handleAddCharacter(pageData[selectedRow])}
          >
            Add
          </button>
        </div>
      );
    } else {
      return null;
    }
  };

  const getCastComp = () => {
    var cast;
    if (Array.isArray(characterUids) && characterUids.length) {
      cast = characterUids.map((uid) => (
        <CharacterAvatar
          uid={uid}
          onRemove={handleRemoveCharacter(uid)}
          key={uid}
        />
      ));
    } else {
      cast = (
        <div>
          <h3>No cast members have been added yet.</h3>
          <p>
            Start by searching for a character, click the search result, then
            click add.
          </p>
        </div>
      );
    }

    return (
      <div>
        <h2>Cast</h2>
        {cast}
      </div>
    );
  };

  return (
    <div>
      <h2>Character Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChanged}
        />
        <button type="submit">Search</button>
      </form>
      {getListComp()}
      {getDetailComp()}
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
