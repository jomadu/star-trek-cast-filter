import characterData from "./testData.json";
import { useEffect, useState } from "react";

export const getCharacterWithId = (id) => {
  console.log(`trying id ${id}`);
  return characterData.find((character) => character.id === id);
};
export const getCharactersMatchingName = (name) => {
  return characterData.filter((character) => character.name === name);
};

export const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [url, options]);
  return [response, error, isLoading];
};

export const useFetchCharacter = (id) => {
  const url = id;
  const options = {};
  return useFetch(url, options);
};

export const useFetchEpisode = (uid) => {
  const url = `http://stapi.co/api/v1/rest/episode?uid=${uid}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  return useFetch(url, options);
};
