// src/DataStore.js
import { reactive } from "vue";

// --- STORE GLOBAL EN MÉMOIRE ---
export const store = reactive({
  pizzas: [],
  restaurants: [],
  orders: [],
});

// --- CHARGEMENT DES DONNÉES JSON ---
export async function loadData() {
  const pizzas = await fetch("/data/pizzas.json").then(r => r.json());
  const restaurants = await fetch("/data/restaurants.json").then(r => r.json());
  const orders = await fetch("/data/orders.json").then(r => r.json());

  store.pizzas = pizzas;
  store.restaurants = restaurants;
  store.orders = orders;
}

// --- GÉNÉRATION D'ID POUR LE CRUD ---
export function getNextId(collection) {
  const arr = store[collection];
  if (!arr || arr.length === 0) return 1;
  return Math.max(...arr.map(x => x.id)) + 1;
}
