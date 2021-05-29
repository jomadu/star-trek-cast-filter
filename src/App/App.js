import styled from "styled-components";
import CharacterAvatar from "../CharacterAvatar/CharacterAvatar";
import CharacterResultListItem from "../CharacterResultListItem/CharacterResultListItem";
import EpisodeResultDetail from "../EpisodeResultDetail/EpisodeResultDetail";
import EpisodeResultListItem from "../EpisodeResultListItem/EpisodeResultListItem";

const App = () => {
  const characterResultListItems = [1, 2, 3, 5].map((id) => (
    <li key={id}>
      <CharacterResultListItem />
    </li>
  ));
  const castListItems = [1, 2, 3].map((id) => (
    <li key={id}>
      <CharacterAvatar />
    </li>
  ));
  const episodeResultListItems = [1, 2, 3].map((id) => (
    <li key={id}>
      <EpisodeResultListItem />
    </li>
  ));

  return (
    <div>
      <h1>Star Trek Cast Filter</h1>
      <input width={40}></input>
      <button>Search</button>
      <ul>{characterResultListItems}</ul>
      <p>Character Detail</p>
      <button>Add</button>
      <h2>Cast</h2>
      <ul>{castListItems}</ul>
      <h2>Filtered Episodes</h2>
      <ul>{episodeResultListItems}</ul>
      <EpisodeResultDetail />
    </div>
  );
};

export default App;
