// src/components/Dashboard/Dashboard.jsx
import React from "react";

const Dashboard = ({ children }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      {children}
    </div>
  );
};

export default Dashboard;
