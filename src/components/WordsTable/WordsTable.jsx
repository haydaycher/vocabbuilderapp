// src/components/WordsTable/WordsTable.jsx
import React from "react";
import ActionsBtn from "./ActionsBtn";
import ProgressBar from "./ProgressBar";
import { useDispatch } from "react-redux";
import { deleteWord, fetchWords } from "../../store/wordsSlice";

const WordsTable = ({ data, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this word?")) return;
    try {
      await dispatch(deleteWord(id)).unwrap();
      await dispatch(fetchWords());
    } catch (err) {
      alert(err || "Failed to delete");
    }
  };

  return (
    <table
      style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
    >
      <thead>
        <tr>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>English</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>
            Ukrainian
          </th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Category</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Progress</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((word) => (
          <tr key={word.id}>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {word.en}
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {word.ua}
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {word.category}
            </td>
            <td
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                minWidth: "120px",
              }}
            >
              <ProgressBar progress={word.progress || 0} />
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              <ActionsBtn
                onEdit={() => onEdit(word)}
                onDelete={() => handleDelete(word.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WordsTable;
