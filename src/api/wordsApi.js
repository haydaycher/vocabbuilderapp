import apiClient from "../services/apiClient";

export const wordsApi = {
  // GET words with pagination + filters
  async getWords({
    page = 1,
    limit = 10,
    search = "",
    category = "",
    verbType = "",
  }) {
    const params = {};

    if (page) params.page = page;
    if (limit) params.limit = limit;
    if (search) params.search = search;
    if (category) params.category = category;
    if (verbType) params.verbType = verbType; // only if category === 'verb'

    const response = await apiClient.get("/words", { params });
    return response.data; // { items, totalPages, totalItems }
  },

  // POST create new word
  async createWord(payload) {
    const response = await apiClient.post("/words", payload);
    return response.data;
  },

  // PATCH update word
  async updateWord(id, payload) {
    const response = await apiClient.patch(`/words/${id}`, payload);
    return response.data;
  },

  // DELETE word
  async deleteWord(id) {
    const response = await apiClient.delete(`/words/${id}`);
    return response.data;
  },
};
