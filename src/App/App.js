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
      <h1>Star Trek: The Next Generation - Episode Filter</h1>
      <p>Find episodes that contain all your favorite TNG characters by:</p>
      <ol>
        <li>
          Entering the character's name to the search field (e.g. "Geordi La
          Forge", "Picard")
        </li>
        <li>Clicking "Search"</li>
        <li>Clicking on a search result to bring up the character details</li>
        <li>
          Clicking the "Add To Cast" button in the character details to add the
          character to your cast
        </li>
        <li>
          Clicking the "Remove From Cast" button to remove the character to your
          cast
        </li>
      </ol>
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
