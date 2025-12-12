import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: { "Content-Type": "application/json" }
});

// Token login (si tu veux protéger admin)
export function setAuthToken(token) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

/* ------------------------- PIZZAS ------------------------- */

export async function getPizzas() {
  const res = await apiClient.get("/pizzas");
  return res.data;
}

export async function getPizza(id) {
  const res = await apiClient.get(`/pizzas/${id}`);
  return res.data;
}

export async function addPizza(pizza) {
  const res = await apiClient.post("/pizzas", pizza);
  return res.data;
}

export async function updatePizza(id, pizza) {
  const res = await apiClient.put(`/pizzas/${id}`, pizza);
  return res.data;
}

export async function deletePizza(id) {
  const res = await apiClient.delete(`/pizzas/${id}`);
  return res.data;
}

/* ---------------------- RESTAURANTS ----------------------- */

export async function getRestaurants() {
  const res = await apiClient.get("/restaurants");
  return res.data;
}

export async function getRestaurant(id) {
  const res = await apiClient.get(`/restaurants/${id}`);
  return res.data;
}

export async function addRestaurant(r) {
  const res = await apiClient.post("/restaurants", r);
  return res.data;
}

export async function updateRestaurant(id, r) {
  const res = await apiClient.put(`/restaurants/${id}`, r);
  return res.data;
}

export async function deleteRestaurant(id) {
  const res = await apiClient.delete(`/restaurants/${id}`);
  return res.data;
}

/* ------------------------- ORDERS ------------------------- */

export async function getOrders() {
  const res = await apiClient.get("/orders");
  return res.data;
}

export async function getOrder(id) {
  const res = await apiClient.get(`/orders/${id}`);
  return res.data;
}

export async function addOrder(order) {
  const res = await apiClient.post("/orders", order);
  return res.data;
}

export async function updateOrder(id, order) {
  const res = await apiClient.put(`/orders/${id}`, order);
  return res.data;
}

export async function deleteOrder(id) {
  const res = await apiClient.delete(`/orders/${id}`);
  return res.data;
}

/* ------------------------- LOGIN -------------------------- */

export async function login(email, password) {
  const res = await apiClient.post("/auth/login", { email, password });
  // Store token for future requests
  setAuthToken(res.data.token);
  return res.data;
}
