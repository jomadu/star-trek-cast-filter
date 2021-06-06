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

  const testData = [...Array(100).keys()].map((i) => {
    return {
      uid: i,
      name: "flarp",
    };
  });

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
  } = usePagination(testData, 5, 3);

  const dataItems = pageData.map((d) => <div>{JSON.stringify(d)}</div>);

  console.log(testData);
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
