import React from "react";

const AddWordBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginTop: "10px",
      }}
    >
      Add Word
    </button>
  );
};

export default AddWordBtn;
