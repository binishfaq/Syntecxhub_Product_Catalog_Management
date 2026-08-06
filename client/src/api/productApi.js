import api from "./api";


export const createProduct = (data) => {
  return api.post("/products", data);
};


export const getProducts = () => {
  return api.get("/products");
};


export const getCategories = () => {
  return api.get("/category");
};


export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};


export const updateProduct = (id, data) => {
  return api.put(`/products/${id}`, data);
};