import { useEffect, useState } from "react";
const characterData = require("./characterData.json");
const episodeData = require("./episodeData.json");

const searchCharacterUrl = "http://stapi.co/api/v1/rest/character/search";
const getCharacterUrl = "http://stapi.co/api/v1/rest/character";
const getEpisodeUrl = "http://stapi.co/api/v1/rest/episode";

const fakeLagMs = 125;

const searchCharactersLocal = (name) => {
  var characters = characterData.filter((character) => {
    return character.name.toLowerCase().includes(name.toLowerCase());
  });

  var searchResults = {
    characters,
  };

  return new Promise((resolve, reject) => {
    setTimeout(
      () => resolve(new Response(JSON.stringify(searchResults))),
      fakeLagMs
    );
  });
};

const getCharacterLocal = (uid) => {
  var character = characterData.find(
    (character) => character.uid.toLowerCase() === uid.toLowerCase()
  );

  var searchResults = {
    character,
  };

  return new Promise((resolve, reject) => {
    if (!character) {
      return setTimeout(
        () => reject(new Error("Character not found")),
        fakeLagMs
      );
    }

    setTimeout(
      () => resolve(new Response(JSON.stringify(searchResults))),
      fakeLagMs
    );
  });
};

const getEpisodeLocal = (uid) => {
  var episode = episodeData.find(
    (episode) => episode.uid.toLowerCase() === uid.toLowerCase()
  );

  var searchResults = {
    episode,
  };

  return new Promise((resolve, reject) => {
    if (!episode) {
      return setTimeout(
        () => reject(new Error("Episode not found")),
        fakeLagMs
      );
    }

    setTimeout(
      () => resolve(new Response(JSON.stringify(searchResults))),
      fakeLagMs
    );
  });
};

const localFetchWrapper = (url, method) => {
  var query = url.substring(url.indexOf("?"));
  var searchParams = new URLSearchParams(query);
  if (url.includes(searchCharacterUrl) && searchParams.has("name")) {
    return searchCharactersLocal(searchParams.get("name"));
  } else if (url.includes(getCharacterUrl) && searchParams.has("uid")) {
    return getCharacterLocal(searchParams.get("uid"));
  } else if (url.includes(getEpisodeUrl) && searchParams.has("uid")) {
    return getEpisodeLocal(searchParams.get("uid"));
  }
};

const fetchWrapper = (url, method) =>
  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

const createGetCharacterUrl = (uid) => `${getCharacterUrl}?uid=${uid}`;

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
      localFetchWrapper(url, method)
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
  }, [url, method]);
  return [data, isLoading, error, setUrl, setMethod];
};

export const useFetchParallel = (initialUrls, initialMethod) => {
  const [urls, setUrls] = useState(initialUrls);
  const [method, setMethod] = useState(initialMethod);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset
    setData(null);
    setIsLoading(true);
    setError(null);
    if (Array.isArray(urls) && urls.length) {
      // There are urls to fetch
      Promise.all(
        urls.map((url) =>
          localFetchWrapper(url, method).then((response) => response.json())
        )
      )
        .then((responses) => {
          setData(responses);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    } else {
      // No urls to fetch
      setIsLoading(false);
    }
  }, [urls, method]);
  return [data, isLoading, error, setUrls, setMethod];
};

export const useGetEpisode = (initialUid) => {
  const createUrl = (uid) => `${getEpisodeUrl}?uid=${uid}`;

  const [uid, setUid] = useState(initialUid);
  const [data, isLoading, error, setUrl] = useFetch(null, "GET");

  useEffect(() => {
    if (uid) {
      setUrl(createUrl(uid));
    }
  }, [uid, setUrl]);

  return [data, isLoading, error, setUid];
};

export const useGetCharacter = (initialUid) => {
  const [uid, setUid] = useState(initialUid);
  const [data, isLoading, error, setUrl] = useFetch(null, "GET");

  useEffect(() => {
    if (uid) {
      setUrl(createGetCharacterUrl(uid));
    }
  }, [uid, setUrl]);

  return [data, isLoading, error, setUid];
};

export const useGetCharacters = (initialUids) => {
  const [uids, setUids] = useState(initialUids);
  const [data, isLoading, error, setUrls] = useFetchParallel(null, "GET");

  useEffect(() => {
    setUrls(uids.map((uid) => createGetCharacterUrl(uid)));
  }, [uids, setUrls]);

  return [data, isLoading, error, setUids];
};

export const useSearchCharacter = (initialName) => {
  const createUrl = (name) => `${searchCharacterUrl}?name=${name}`;

  const [name, setName] = useState(initialName);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [fetchResponse, fetchIsLoading, fetchError, setFetchUrl] = useFetch(
    null,
    "POST"
  );

  useEffect(() => {
    if (name) {
      setData(fetchResponse);
      setIsLoading(fetchIsLoading);
      setError(fetchError);
      setFetchUrl(createUrl(name));
    } else {
      setData(null);
      setIsLoading(false);
      setError(null);
      setFetchUrl(null);
    }
  }, [name, fetchResponse, fetchIsLoading, fetchError, setFetchUrl]);

  return [data, isLoading, error, name, setName];
};
