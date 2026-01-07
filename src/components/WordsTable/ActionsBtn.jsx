// src/components/WordsTable/ActionsBtn.jsx
import React, { useState, useRef, useEffect } from "react";

const ActionsBtn = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Закриття при кліку поза поповер
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button onClick={() => setOpen(!open)}>⋮</button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "4px",
            zIndex: 10,
          }}
        >
          <button onClick={onEdit} style={{ display: "block", width: "100%" }}>
            Edit
          </button>
          <button
            onClick={onDelete}
            style={{ display: "block", width: "100%" }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionsBtn;
