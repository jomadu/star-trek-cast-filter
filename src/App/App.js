import { useState } from "react";
import Episodes from "../Episodes/Episodes";
import CastCreator from "../CastCreator/CastCreator";

const App = () => {
  const [characters, setCharacters] = useState([]);

  const handleAddCharacter = (uid) => {
    if (!characters.includes(uid)) {
      setCharacters([...characters, uid]);
    }
  };

  const handleRemoveCharacter = (uid) => {
    setCharacters(characters.filter((_uid) => _uid !== uid));
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
