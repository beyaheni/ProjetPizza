<template>
  <section class="admin-page">

    <h1>Gestion des Pizzas</h1>

    <button class="btn-primary" @click="$router.push('/gestion-pizzas/new')">
      ➕ Nouvelle pizza
    </button>

    <table class="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Prix (€)</th>
          <th>Ingrédients</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in store.pizzas" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.name }}</td>
          <td>{{ p.price }}</td>
          <td>{{ p.ingredients }}</td>

          <td>
            <button class="btn-secondary" @click="$router.push('/gestion-pizzas/' + p.id)">Voir</button>
            <button class="btn-secondary" @click="$router.push('/gestion-pizzas/' + p.id + '/edit')">Modifier</button>
            <button class="btn-danger" @click="supprimer(p.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

  </section>
</template>

<script setup>
import { store } from "../DataStore";

function supprimer(id) {
  store.pizzas = store.pizzas.filter(p => p.id !== id);
}
</script>

<style scoped>
.admin-page {
  max-width: 1000px;
  margin: auto;
}

.admin-page h1 {
  font-size: 42px;
  margin-bottom: 20px;
  color: #7a2d2d;
}

/* TABLE */
.admin-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.admin-table th {
  background: #fbdc7c;
  padding: 12px;
  text-align: left;
  font-size: 18px;
  color: #5c3b00;
}

.admin-table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

/* BUTTONS */
.btn-primary {
  background: #8f2e2e;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 15px;
}

.btn-secondary {
  background: #f2c46d;
  color: #5c3b00;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  margin-right: 5px;
  cursor: pointer;
}

.btn-danger {
  background: #c0392b;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
