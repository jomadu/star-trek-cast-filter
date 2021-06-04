import characterData from "./testData.json";
import { useEffect, useState } from "react";

export const getCharacterWithId = (id) => {
  console.log(`trying id ${id}`);
  return characterData.find((character) => character.id === id);
};
export const getCharactersMatchingName = (name) => {
  return characterData.filter((character) => character.name === name);
};

export const useFetch = (initialUrl, initialMethod) => {
  const [url, setUrl] = useState(initialUrl);
  const [method, setMethod] = useState(initialMethod);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null);
    setIsLoading(true);
    setError(null);

    if (url && method) {
      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [url, method, setData, setIsLoading, setError]);
  return [data, isLoading, error, setUrl, setMethod];
};

export const useGetEpisode = (initialUid) => {
  const createUrl = (uid) => `http://stapi.co/api/v1/rest/episode?uid=${uid}`;

  const [uid, setUid] = useState(initialUid);
  const [data, isLoading, error, setUrl] = useFetch(
    uid && createUrl(uid),
    "GET"
  );

  useEffect(() => {
    if (uid) {
      setUrl(createUrl(uid));
    }
  }, [uid, setUrl]);

  return [data, isLoading, error, setUid];
};

export const useGetCharacter = (initialUid) => {
  const createUrl = (uid) => `http://stapi.co/api/v1/rest/character?uid=${uid}`;

  const [uid, setUid] = useState(initialUid);
  const [data, isLoading, error, setUrl] = useFetch(
    uid && createUrl(uid),
    "GET"
  );

  useEffect(() => {
    if (uid) {
      setUrl(createUrl(uid));
    }
  }, [uid, setUrl]);

  return [data, isLoading, error, setUid];
};

export const useSearchCharacter = (initialName) => {
  const createUrl = (name) =>
    `http://stapi.co/api/v1/rest/character/search?name=${name}`;

  const [name, setName] = useState(initialName);
  const [data, isLoading, error, setUrl] = useFetch(
    name && createUrl(name),
    "POST"
  );

  useEffect(() => {
    if (name) {
      setUrl(createUrl(name));
    }
  }, [name, setUrl]);

  return [data, isLoading, error, setName];
};
