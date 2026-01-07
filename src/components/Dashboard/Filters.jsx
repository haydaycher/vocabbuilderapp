import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categoriesSlice";

const Filters = ({ filters, onChange }) => {
  const categories = useSelector(selectCategories);

  const [local, setLocal] = useState({
    search: filters.search || "",
    category: filters.category || "",
    verbType: filters.verbType || "",
  });

  const debounceTimer = useRef(null);

  // Синхронізація з props.filters
  useEffect(() => {
    setLocal({ ...filters, verbType: filters.verbType || "" });
  }, [filters]);

  const triggerChange = (updated) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      onChange(updated);
    }, 300);
  };

  const handleSearchChange = (value) => {
    const trimmed = value.trim();
    const updated = { ...local, search: trimmed };
    setLocal(updated);
    triggerChange(updated);
  };

  const handleCategoryChange = (value) => {
    const updated = { ...local, category: value, verbType: "" };
    setLocal(updated);
    onChange(updated); // category зміни — без debounce
  };

  const handleVerbTypeChange = (value) => {
    const updated = { ...local, verbType: value };
    setLocal(updated);
    onChange(updated);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginBottom: "10px",
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        value={local.search}
        onChange={(e) => handleSearchChange(e.target.value)}
        style={{
          padding: "6px 10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      <select
        value={local.category}
        onChange={(e) => handleCategoryChange(e.target.value)}
        style={{
          padding: "6px 10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {local.category === "verb" && (
        <div>
          <label style={{ marginRight: "10px" }}>
            <input
              type="radio"
              name="verbType"
              value="regular"
              checked={local.verbType === "regular"}
              onChange={(e) => handleVerbTypeChange(e.target.value)}
            />
            Regular
          </label>
          <label>
            <input
              type="radio"
              name="verbType"
              value="irregular"
              checked={local.verbType === "irregular"}
              onChange={(e) => handleVerbTypeChange(e.target.value)}
            />
            Irregular
          </label>
        </div>
      )}
    </div>
  );
};

export default Filters;
