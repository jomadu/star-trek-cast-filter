import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSearchCharacter } from "../utils";
import CharacterResultListItem from "../CharacterResultListItem/CharacterResultListItem";
import CharacterResultDetail from "../CharacterResultDetail/CharacterResultDetail";

const CastCreator = ({ characters, onAddCharacter, onRemoveCharacter }) => {
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
      {searchResultsComp}
      {detailsComp}
      <h2>Cast</h2>
      {castComp}
    </div>
  );
};

CastCreator.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddCharacter: PropTypes.func.isRequired,
  onRemoveCharacter: PropTypes.func.isRequired,
};

export default CastCreator;
