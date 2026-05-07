import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
  timeout: 12000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("juhaara_access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const endpoints = {
  products: "/products/",
  categories: "/categories/",
  orders: "/orders/",
  dashboard: "/analytics/dashboard/",
  notifications: "/notifications/"
};
