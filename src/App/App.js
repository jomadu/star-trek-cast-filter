import { useState } from "react";
import Adder from "../Adder/Adder";
import Cast from "../Cast/Cast";
import Episodes from "../Episodes/Episodes";
import EpisodeResultListItem from "../EpisodeResultListItem/EpisodeResultListItem";

const App = () => {
  // const [characterSearchQuery, setCharacterSearchQuery] = useState("");
  // const [characterSearchResults, setCharacterSearchResults] = useState([]);
  // const [characterSearchResultsLoading, setCharacterSearchResultsLoading] =
  //   useState(false);
  // const [characterSearchResultsError, setCharacterSearchResultsError] =
  //   useState(null);
  // const [selectedCharacterSearchResult, setSelectedCharacterSearchResult] =
  //   useState(null);

  // const [selectedCharacters, setSelectedCharacters] = useState([]);
  // const [episodeResults, setEpisodeResults] = useState([]);
  // const [episodeResultsLoading, setEpisodeResultsLoading] = useState(false);
  // const [episodeResultsError, setEpisodeResultsError] = useState(null);

  // const handleCharacterSearchQueryChange = (event) => {
  //   setCharacterSearchQuery(event.target.value);
  // };

  // const handleCharacterSearch = (event) => {
  //   setCharacterSearchResults(
  //     characterSearchQuery.split(",").map((n) => Number(n))
  //   );
  //   event.preventDefault();
  // };

  // const handleSelectedCharacterSearchResultChange = (id) => {
  //   return () => setSelectedCharacterSearchResult(id);
  // };

  // const characterResultListItems = characterSearchResults.map((id) => (
  //   <li key={id}>
  //     <CharacterResultListItem
  //       id={id}
  //       selected={selectedCharacterSearchResult === id}
  //       onSelect={handleSelectedCharacterSearchResultChange(id)}
  //     />
  //   </li>
  // ));
  // const castListItems = selectedCharacters.map((id) => (
  //   <li key={id}>
  //     <CharacterAvatar id={id} />
  //   </li>
  // ));
  // const episodeResultListItems = [1, 2, 3].map((id) => (
  //   <li key={id}>
  //     <EpisodeResultListItem id={id} />
  //   </li>
  // ));

  const [characters, setCharacters] = useState([]);

  const handleAddCharacter = (id) => {
    if (!characters.includes(id)) {
      setCharacters([...characters, id]);
    }
  };

  const handleRemoveCharacter = (id) => {
    setCharacters(characters.filter((_id) => _id !== id));
  };

  return (
    <div>
      <h1>Star Trek Cast Filter</h1>
      {/* <form onSubmit={handleCharacterSearch}>
        <label>
          Character Name:
          <input
            type="text"
            value={characterSearchQuery}
            onChange={handleCharacterSearchQueryChange}
            width={40}
          />
        </label>
        <input type="submit" value="Search" />
      </form>

      <ul>{characterResultListItems}</ul>
      {selectedCharacterSearchResult !== null}
      <button>Add</button>
      <h2>Cast</h2>
      <ul>{castListItems}</ul>
      <h2>Filtered Episodes</h2>
      <ul>{episodeResultListItems}</ul>
      <EpisodeResultDetail /> */}
      <Adder characters={characters} onAddCharacter={handleAddCharacter} />
      <Cast characters={characters} onRemoveCharacter={handleRemoveCharacter} />
      <Episodes characters={characters} />
      <EpisodeResultListItem uid={"EPMA0000001001"} />
    </div>
  );
};

export default App;
