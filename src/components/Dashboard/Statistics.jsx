// src/components/Dashboard/Statistics.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

const Statistics = () => {
  const [stats, setStats] = useState({ totalCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get("/words/statistics");
        setStats(response.data);
      } catch (err) {
        setError("Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p>Loading statistics...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ marginTop: "10px" }}>
      <p>Total words to learn: {stats.totalCount}</p>
    </div>
  );
};

export default Statistics;
