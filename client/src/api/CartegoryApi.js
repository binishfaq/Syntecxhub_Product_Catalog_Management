import api from "./api";

export const createCategory = (data) => {
  return api.post("/category", data);
};

export const getCategories = () => {
  return api.get("/category");
};

export const deleteCategory = (id) => {
  return api.delete(`/category/${id}`);
};

export const updateCategory = (id, data) => {
  return api.put(`/category/${id}`, data);
};