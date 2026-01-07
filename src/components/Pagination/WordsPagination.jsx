// src/components/Pagination/WordsPagination.jsx
import React from "react";

const WordsPagination = ({ page, total, pageSize = 10, onChangePage }) => {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const handleClick = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    onChangePage(newPage);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          style={{
            margin: "0 4px",
            padding: "6px 10px",
            backgroundColor: i === page ? "#007bff" : "#fff",
            color: i === page ? "#fff" : "#000",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div style={{ marginTop: "16px", textAlign: "center" }}>
      <button
        onClick={() => handleClick(page - 1)}
        disabled={page === 1}
        style={{ marginRight: "8px" }}
      >
        Prev
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handleClick(page + 1)}
        disabled={page === totalPages}
        style={{ marginLeft: "8px" }}
      >
        Next
      </button>
    </div>
  );
};

export default WordsPagination;
