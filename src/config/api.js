import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9999",
});
//lay bang Category
export const getCategories = () => API.get("/Category");
//lay bang Product
export const getProducts = () => API.get("/Product");
export const getProductById = (id) => API.get(`/Product/${id}`);
//them 1 san pham vao Product
export const addProduct = (data) => API.post(`/Product`, data);
//xoa 1 san pham khoi Product
export const deleteProduct = (id) => API.delete(`/Product/${id}`);
// sua 1 san pham
export const updateProduct = (id, data) => API.put(`/Product/${id}`, data);
