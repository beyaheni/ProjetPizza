import { readJSON, writeJSON } from '../services/jsonService.js';

export const getRestaurants = (req, res) => {
  const restaurants = readJSON('restaurants.json');  // Lire les restaurants depuis le fichier JSON
  res.json(restaurants);  // Retourner les restaurants
};

export const getRestaurant = (req, res) => {
  const restaurants = readJSON('restaurants.json');
  const restaurant = restaurants.find(r => r.id == req.params.id);
  if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });
  res.json(restaurant);
};

// Autres fonctions (add, update, delete, etc.)

export function addRestaurant(req, res) {
  const restaurants = readJSON("restaurants.json");
  const newRestaurant = { id: Date.now(), ...req.body };

  restaurants.push(newRestaurant);
  writeJSON("restaurants.json", restaurants);

  res.json(newRestaurant);
}

export function updateRestaurant(req, res) {
  const restaurants = readJSON("restaurants.json");
  const index = restaurants.findIndex(r => r.id == req.params.id);

  if (index === -1) return res.status(404).json({ error: "Restaurant not found" });

  restaurants[index] = { ...restaurants[index], ...req.body };
  writeJSON("restaurants.json", restaurants);

  res.json(restaurants[index]);
}

export function deleteRestaurant(req, res) {
  const restaurants = readJSON("restaurants.json");
  const updated = restaurants.filter(r => r.id != req.params.id);

  writeJSON("restaurants.json", updated);

  res.json({ success: true });
}
