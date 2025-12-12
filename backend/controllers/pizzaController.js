import { readJSON, writeJSON } from '../services/jsonService.js';

export const getPizzas = (req, res) => {
  const pizzas = readJSON('pizzas.json');  // Lire les pizzas depuis le fichier JSON
  res.json(pizzas);  // Retourner les pizzas
};

export const getPizza = (req, res) => {
  const pizzas = readJSON('pizzas.json');
  const pizza = pizzas.find(p => p.id == req.params.id);
  if (!pizza) return res.status(404).json({ error: "Pizza not found" });
  res.json(pizza);
};

// Autres fonctions (add, update, delete, etc.)

export const addPizza = (req, res) => {
  const { name, price, ingredients } = req.body;
  const pizzas = readJSON('pizzas.json');
  const newPizza = { id: pizzas.length + 1, name, price, ingredients };
  pizzas.push(newPizza);
  writeJSON('pizzas.json', pizzas);  // Sauvegarde le fichier
  res.status(201).json(newPizza);
};

export const updatePizza = (req, res) => {
  const pizzas = readJSON('pizzas.json');
  const pizza = pizzas.find(p => p.id == req.params.id);
  if (!pizza) return res.status(404).json({ error: "Pizza not found" });

  pizza.name = req.body.name || pizza.name;
  pizza.price = req.body.price || pizza.price;
  pizza.ingredients = req.body.ingredients || pizza.ingredients;

  writeJSON('pizzas.json', pizzas);  // Sauvegarde le fichier
  res.json(pizza);
};

export const deletePizza = (req, res) => {
  let pizzas = readJSON('pizzas.json');
  pizzas = pizzas.filter(p => p.id != req.params.id);
  writeJSON('pizzas.json', pizzas);  // Sauvegarde le fichier
  res.status(204).end();
};
