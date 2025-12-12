import { readJSON, writeJSON } from '../services/jsonService.js';

export const getOrders = (req, res) => {
  const orders = readJSON('orders.json');  // Lire les commandes depuis le fichier JSON
  res.json(orders);  // Retourner les commandes
};

export const getOrder = (req, res) => {
  const orders = readJSON('orders.json');
  const order = orders.find(o => o.id == req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
};

// Autres fonctions (add, update, delete, etc.)

export function addOrder(req, res) {
  const orders = readJSON("orders.json");
  const newOrder = { id: Date.now(), ...req.body };

  orders.push(newOrder);
  writeJSON("orders.json", orders);

  res.json(newOrder);
}

export function updateOrder(req, res) {
  const orders = readJSON("orders.json");
  const index = orders.findIndex(o => o.id == req.params.id);

  if (index === -1) return res.status(404).json({ error: "Order not found" });

  orders[index] = { ...orders[index], ...req.body };
  writeJSON("orders.json", orders);

  res.json(orders[index]);
}

export function deleteOrder(req, res) {
  const orders = readJSON("orders.json");
  const updated = orders.filter(o => o.id != req.params.id);

  writeJSON("orders.json", updated);

  res.json({ success: true });
}
