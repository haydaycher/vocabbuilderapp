// src/components/WordsTable/ProgressBar.jsx
import React from "react";

const ProgressBar = ({ progress }) => {
  const percentage = Math.min(Math.max(progress, 0), 100);

  return (
    <div
      style={{
        width: "100%",
        background: "#e0e0e0",
        borderRadius: "4px",
        height: "12px",
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          background: "#4caf50",
          height: "100%",
          borderRadius: "4px",
          transition: "width 0.3s",
        }}
      />
    </div>
  );
};

export default ProgressBar;
