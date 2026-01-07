// src/components/Modals/EditWordForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateWord } from "../../store/wordsSlice";

const EditWordForm = ({ word, onCancel, onSuccess }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      en: word.en,
      ua: word.ua,
    },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(updateWord({ id: word.id, ...data })).unwrap();
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
      {errors.en && <p style={{ color: "red" }}>{errors.en.message}</p>}

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
      {errors.ua && <p style={{ color: "red" }}>{errors.ua.message}</p>}

      {errors.api && <p style={{ color: "red" }}>{errors.api.message}</p>}

      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditWordForm;
