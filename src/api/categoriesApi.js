import apiClient from "../services/apiClient";

export const categoriesApi = {
  async getAllCategories() {
    const response = await apiClient.get("/categories");
    return response.data;
  },
};
