import API from "./api";

export const getOrders = async () => {
  const res = await API.get("/orders");
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await API.get(`/orders/${id}`);
  return res.data;
};

export const updateStatus = async (id, data) => {
  const res = await API.put(`/orders/${id}`, data);
  return res.data;
};
