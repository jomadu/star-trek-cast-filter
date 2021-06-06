import { useState } from "react";
import Episodes from "../Episodes/Episodes";
import CastCreator from "../CastCreator/CastCreator";
import Pagination from "../Pagination/Pagination";
import { usePagination } from "../utils";

const App = () => {
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
      <CastCreator
        characters={characters}
        onAddCharacter={handleAddCharacter}
        onRemoveCharacter={handleRemoveCharacter}
      />
      <Episodes characters={characters} />
    </div>
  );
};

export default App;
