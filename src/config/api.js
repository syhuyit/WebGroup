import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9999",
});
//lay bang Product
export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);
//them 1 san pham vao Product
export const addProduct = (data) => API.post(`/products`, data);
//xoa 1 san pham khoi Product
export const deleteProduct = (id) => API.delete(`/products/${id}`);
// sua 1 san pham
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
