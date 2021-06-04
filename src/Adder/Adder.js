import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSearchCharacter } from "../utils";
import CharacterResultListItem from "../CharacterResultListItem/CharacterResultListItem";
import CharacterResultDetail from "../CharacterResultDetail/CharacterResultDetail";

const Adder = ({ characters, onAddCharacter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, isLoading, error, setName] = useSearchCharacter(searchTerm);
  const [selected, setSelected] = useState("");

  console.log(results);

  const handleSearchTermChanged = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    setName(searchTerm);
    event.preventDefault();
  };

  const handleOnSelect = (uid) => () => setSelected(uid);
  const handleOnAdd = (uid) => () => selected && onAddCharacter(selected);

  var resultsComponent;
  if (error) {
    resultsComponent = <p>{error}</p>;
  } else if (isLoading) {
    resultsComponent = <p>loading</p>;
  } else if (results) {
    resultsComponent = (
      <div>
        <ul>
          {results.characters.map((c) => (
            <li key={c.uid}>
              <CharacterResultListItem
                uid={c.uid}
                onSelect={handleOnSelect(c.uid)}
                selected={selected === c.uid}
              />
            </li>
          ))}
        </ul>
        <button type="button" onClick={handleOnAdd()}>
          Add
        </button>
      </div>
    );
  }

  var detailsComponent;
  if (selected) {
    detailsComponent = <CharacterResultDetail uid={selected} />;
  }
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
      {resultsComponent}
      {detailsComponent}
    </div>
  );
};

Adder.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddCharacter: PropTypes.func.isRequired,
};

export default Adder;
