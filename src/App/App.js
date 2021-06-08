import { useState } from "react";
import Episodes from "../Episodes/Episodes";
import CastCreator from "../CastCreator/CastCreator";

const App = () => {
  const [characterUids, setCharacterUids] = useState([]);

  const handleAddCharacterUid = (uid) => {
    if (!characterUids.includes(uid)) {
      setCharacterUids([...characterUids, uid]);
    }
  };

  const handleRemoveCharacterUid = (uid) => {
    setCharacterUids(characterUids.filter((_uid) => _uid !== uid));
  };

  return (
    <div>
      <h1>Star Trek Cast Filter</h1>
      <CastCreator
        characterUids={characterUids}
        onAddCharacterUid={handleAddCharacterUid}
        onRemoveCharacterUid={handleRemoveCharacterUid}
      />
      <Episodes characterUids={characterUids} />
    </div>
  );
};

export default App;
