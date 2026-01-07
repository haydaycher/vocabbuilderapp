// src/store/wordsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../services/apiClient";

// Асинхронні дії
export const fetchWords = createAsyncThunk(
  "words/fetchWords",
  async (_, { getState, rejectWithValue }) => {
    const state = getState().words;
    const { page, pageSize } = state.pagination;
    const { search, category, difficulty } = state.filters;

    try {
      const params = { page, pageSize };
      if (search) params.search = search.trim();
      if (category) params.category = category;
      if (difficulty) params.difficulty = difficulty;

      const response = await apiClient.get("/words", { params });
      return response.data; // { words: [...], total: 50 }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch words"
      );
    }
  }
);

export const createWord = createAsyncThunk(
  "words/createWord",
  async (wordData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/words", wordData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create word"
      );
    }
  }
);

export const updateWord = createAsyncThunk(
  "words/updateWord",
  async ({ id, ...wordData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/words/${id}`, wordData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update word"
      );
    }
  }
);

export const deleteWord = createAsyncThunk(
  "words/deleteWord",
  async (id, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/words/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete word"
      );
    }
  }
);

// Slice
const wordsSlice = createSlice({
  name: "words",
  initialState: {
    items: [],
    status: "idle", // idle | loading | success | error
    error: null,
    filters: { search: "", category: "", difficulty: "" },
    pagination: { page: 1, pageSize: 10, total: 0 },
  },
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch words
      .addCase(fetchWords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload.words;
        state.pagination.total = action.payload.total;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      // Create word
      .addCase(createWord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createWord.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(createWord.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      // Update word
      .addCase(updateWord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateWord.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(updateWord.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      // Delete word
      .addCase(deleteWord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.items = state.items.filter((w) => w.id !== action.payload);
        state.status = "success";
        state.pagination.total -= 1;
      })
      .addCase(deleteWord.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const { setFilters, setPage } = wordsSlice.actions;

// Селектори
export const selectWords = (state) => state.words.items;
export const selectWordsStatus = (state) => state.words.status;
export const selectPagination = (state) => state.words.pagination;
export const selectFilters = (state) => state.words.filters;

export default wordsSlice.reducer;
