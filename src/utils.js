import { useEffect, useState } from "react";

const fetchWrapper = (url, method) =>
  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

const createGetCharacterUrl = (uid) =>
  `http://stapi.co/api/v1/rest/character?uid=${uid}`;

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
      fetchWrapper(url, method)
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
    setData(null);
    setIsLoading(true);
    setError(null);
    if (urls) {
      Promise.all(
        urls.map((url, index) =>
          fetchWrapper(url, method).then((response) => response.json())
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
      setIsLoading(false);
    }
  }, [urls, method]);
  return [data, isLoading, error, setUrls, setMethod];
};

export const useGetEpisode = (initialUid) => {
  const createUrl = (uid) => `http://stapi.co/api/v1/rest/episode?uid=${uid}`;

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
  const createUrl = (name) =>
    `http://stapi.co/api/v1/rest/character/search?name=${name}`;

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

export const usePagination = (
  initialData,
  initialItemsPerPage,
  initialPageGroupLimit
) => {
  const calcNumPages = (dataArr, itemsPerPage) =>
    data?.constructor === Array ? Math.ceil(dataArr.length / itemsPerPage) : 0;

  const [data, setData] = useState(initialData);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [numPages, setNumPages] = useState(calcNumPages(data, itemsPerPage));
  const [pageGroupLimit, setPageGroupLimit] = useState(initialPageGroupLimit);
  const [pageData, setPageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState([]);

  const goToPage = (page) => () => {
    setCurrentPage(page);
  };
  const goToFirstPage = () => {
    setCurrentPage(1);
  };
  const goToLastPage = () => {
    setCurrentPage(numPages);
  };
  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };
  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, numPages));
  };

  // Effect to update the number of pages
  useEffect(() => {
    setNumPages(calcNumPages(data, itemsPerPage));
  }, [data, itemsPerPage]);

  // Effect to ensure that when data changes, we go back to page 1
  useEffect(() => {
    goToFirstPage();
  }, [data]);

  // Effect to update the page data
  useEffect(() => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    const end = start + itemsPerPage;
    setPageData(data?.constructor === Array ? data.slice(start, end) : []);
  }, [currentPage, itemsPerPage, data]);

  // Effect to update the page group
  useEffect(() => {
    if (pageGroupLimit > numPages) {
      setPageGroup([...Array(numPages).keys()].map((i) => i + 1));
    } else {
      const center = currentPage;
      var start =
        center -
        Math.floor((pageGroupLimit - (pageGroupLimit % 2 == 0 ? 1 : 0)) / 2);
      var end = center + Math.floor(pageGroupLimit / 2);
      if (start < 1) {
        start = 1;
        end = start + pageGroupLimit;
      } else if (end >= numPages) {
        end = numPages;
        start = end - pageGroupLimit + 1;
      }
      setPageGroup([...Array(pageGroupLimit).keys()].map((i) => i + start));
    }
  }, [currentPage, pageGroupLimit, numPages]);

  return {
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
  };
};
