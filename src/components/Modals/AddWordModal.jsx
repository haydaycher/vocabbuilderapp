import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategories } from "../../store/categoriesSlice";
import { createWord, fetchWords } from "../../store/wordsSlice";

const enPattern = /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/;
const uaPattern = /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u;

const AddWordModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const [form, setForm] = useState({
    en: "",
    ua: "",
    category: "",
    verbType: "",
  });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const en = form.en.trim();
    const ua = form.ua.trim();
    const category = form.category;
    const verbType = form.verbType;

    if (!enPattern.test(en)) {
      setErrors("Invalid English word");
      return;
    }
    if (!uaPattern.test(ua)) {
      setErrors("Invalid Ukrainian word");
      return;
    }
    if (!category) {
      setErrors("Please select category");
      return;
    }
    if (category === "verb" && !verbType) {
      setErrors("Please select verb type");
      return;
    }

    setErrors("");
    setLoading(true);

    try {
      await dispatch(createWord({ en, ua, category, verbType })).unwrap();
      await dispatch(fetchWords());
      onClose();
    } catch (err) {
      alert(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "320px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h3>Add Word</h3>

        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {form.category === "verb" && (
          <div style={{ display: "flex", gap: "10px" }}>
            <label>
              <input
                type="radio"
                name="verbType"
                value="regular"
                checked={form.verbType === "regular"}
                onChange={handleChange}
              />
              Regular
            </label>
            <label>
              <input
                type="radio"
                name="verbType"
                value="irregular"
                checked={form.verbType === "irregular"}
                onChange={handleChange}
              />
              Irregular
            </label>
          </div>
        )}

        <input
          type="text"
          name="en"
          placeholder="English"
          value={form.en}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ua"
          placeholder="Ukrainian"
          value={form.ua}
          onChange={handleChange}
        />

        {errors && <p style={{ color: "red" }}>{errors}</p>}

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
        >
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWordModal;
