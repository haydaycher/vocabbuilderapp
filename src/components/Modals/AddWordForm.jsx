// src/components/Modals/AddWordForm.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { createWord } from "../../store/wordsSlice";

const AddWordForm = ({ onCancel, onSuccess }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      category: "",
      verbType: "",
      en: "",
      ua: "",
    },
  });

  const selectedCategory = watch("category");

  const onSubmit = async (data) => {
    try {
      await dispatch(createWord(data)).unwrap();
      reset();
      onSuccess();
    } catch (err) {
      setError("api", {
        type: "manual",
        message: err.message || "Server error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Category:
        <select {...register("category", { required: true })}>
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      {errors.category && <p>Please select a category</p>}

      {selectedCategory === "verb" && (
        <div>
          <label>
            <input
              type="radio"
              value="transitive"
              {...register("verbType", { required: true })}
            />
            Transitive
          </label>
          <label>
            <input
              type="radio"
              value="intransitive"
              {...register("verbType", { required: true })}
            />
            Intransitive
          </label>
          {errors.verbType && <p>Please select verb type</p>}
        </div>
      )}

      <label>
        English:
        <input
          {...register("en", {
            required: "English word is required",
            pattern: {
              value: /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/,
              message: "Invalid English word",
            },
          })}
        />
      </label>
      {errors.en && <p>{errors.en.message}</p>}

      <label>
        Ukrainian:
        <input
          {...register("ua", {
            required: "Ukrainian word is required",
            pattern: {
              value: /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
              message: "Invalid Ukrainian word",
            },
          })}
        />
      </label>
      {errors.ua && <p>{errors.ua.message}</p>}

      {errors.api && <p style={{ color: "red" }}>{errors.api.message}</p>}

      <button type="submit">Add</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default AddWordForm;
