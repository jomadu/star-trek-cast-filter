import React, { useState } from "react";
import PropTypes from "prop-types";

const Pagination = ({
  pageGroup,
  currentPage,
  onGoToPageClicked,
  onGoToFirstPageClicked,
  onGoToLastPageClicked,
  onGoToPreviousPageClicked,
  onGoToNextPageClicked,
}) => {
  return (
    <div>
      <button type="button" onClick={onGoToFirstPageClicked}>
        {"|<"}
      </button>
      <button type="button" onClick={onGoToPreviousPageClicked}>
        {"<"}
      </button>
      {pageGroup.map((i) => (
        <div onClick={onGoToPageClicked(i)} key={i}>
          {i}
          {i === currentPage && " *"}
        </div>
      ))}
      <button type="button" onClick={onGoToNextPageClicked}>
        {">"}
      </button>
      <button type="button" onClick={onGoToLastPageClicked}>
        {">|"}
      </button>
    </div>
  );
};

Pagination.propTypes = {
  pageGroup: PropTypes.array.isRequired,
  currentPage: PropTypes.node.isRequired,
  onGoToPageClicked: PropTypes.func.isRequired,
  onGoToFirstPageClicked: PropTypes.func.isRequired,
  onGoToLastPageClicked: PropTypes.func.isRequired,
  onGoToPreviousPageClicked: PropTypes.func.isRequired,
  onGoToNextPageClicked: PropTypes.func.isRequired,
};

export default Pagination;
