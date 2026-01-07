// src/store/categoriesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../services/apiClient";

// Асинхронна дія для завантаження категорій
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/categories");
      return response.data; // очікуємо масив категорій [{ id, name }, ...]
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

// Початкові категорії
const initialCategories = [
  { id: "verb", name: "Verb" },
  { id: "participle", name: "Participle" },
  { id: "noun", name: "Noun" },
  { id: "adjective", name: "Adjective" },
  { id: "pronoun", name: "Pronoun" },
  { id: "numerals", name: "Numerals" },
  { id: "adverb", name: "Adverb" },
  { id: "preposition", name: "Preposition" },
  { id: "conjunction", name: "Conjunction" },
  { id: "phrasalVerb", name: "Phrasal verb" },
  { id: "functionalPhrase", name: "Functional phrase" },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: initialCategories,
    status: "idle", // idle | loading | success | error
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "success";
        // Якщо бекенд повернув категорії, використовуємо їх, інакше залишаємо початкові
        state.items = action.payload.length
          ? action.payload
          : initialCategories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

// Селектори
export const selectCategories = (state) => state.categories.items;
export const selectCategoriesStatus = (state) => state.categories.status;

export default categoriesSlice.reducer;
