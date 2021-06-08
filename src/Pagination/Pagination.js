import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  &.first {
    margin: 0px 3px 0px 0px;
  }
  &.prev {
    margin: 0px 3px 0px 0px;
  }
  &.page {
    margin: 1px;
  }
  &.next {
    margin: 0px 0px 0px 3px;
  }
  &.last {
    margin: 0px 0px 0px 3px;
  }
`;

const Pagination = ({
  pageGroup,
  currentPage,
  numPages,
  onGoToPageClicked,
  onGoToFirstPageClicked,
  onGoToLastPageClicked,
  onGoToPreviousPageClicked,
  onGoToNextPageClicked,
}) => {
  return (
    <div>
      <StyledButton
        type="button"
        className={"first"}
        onClick={onGoToFirstPageClicked}
      >
        First (1)
      </StyledButton>
      <StyledButton
        type="button"
        className={"prev"}
        onClick={onGoToPreviousPageClicked}
      >
        {"Prev"}
      </StyledButton>
      {pageGroup.map((i) => (
        <StyledButton className={"page"} onClick={onGoToPageClicked(i)} key={i}>
          {i}
          {i === currentPage && "*"}
        </StyledButton>
      ))}
      <StyledButton
        type="button"
        className={"next"}
        onClick={onGoToNextPageClicked}
      >
        {"Next"}
      </StyledButton>
      <StyledButton
        type="button"
        className={"last"}
        onClick={onGoToLastPageClicked}
      >
        Last ({numPages})
      </StyledButton>
    </div>
  );
};

Pagination.propTypes = {
  pageGroup: PropTypes.array.isRequired,
  currentPage: PropTypes.node.isRequired,
  numPages: PropTypes.node.isRequired,
  onGoToPageClicked: PropTypes.func.isRequired,
  onGoToFirstPageClicked: PropTypes.func.isRequired,
  onGoToLastPageClicked: PropTypes.func.isRequired,
  onGoToPreviousPageClicked: PropTypes.func.isRequired,
  onGoToNextPageClicked: PropTypes.func.isRequired,
};

export const usePagination = (
  initialData,
  initialItemsPerPage,
  initialPageGroupLimit
) => {
  const [data, setData] = useState(initialData);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [pageGroupLimit, setPageGroupLimit] = useState(initialPageGroupLimit);

  const calcNumPages = useCallback(
    () =>
      data?.constructor === Array ? Math.ceil(data.length / itemsPerPage) : 0,
    [data, itemsPerPage]
  );

  const [numPages, setNumPages] = useState(calcNumPages());
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
    setNumPages(calcNumPages());
  }, [data, itemsPerPage, calcNumPages]);

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
        Math.floor((pageGroupLimit - (pageGroupLimit % 2 === 0 ? 1 : 0)) / 2);
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

export default Pagination;
