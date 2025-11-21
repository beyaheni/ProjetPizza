<template>
  <section class="admin-page">

    <h1>Gestion des Commandes</h1>

    <button class="btn-primary" @click="$router.push('/gestion-orders/new')">
      ➕ Nouvelle commande
    </button>

    <table class="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Client</th>
          <th>Total (€)</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="o in store.orders" :key="o.id">
          <td>{{ o.id }}</td>
          <td>{{ o.customerName }}</td>
          <td>{{ o.total }}</td>
          <td>{{ o.status }}</td>

          <td>
            <button class="btn-secondary" @click="$router.push('/gestion-orders/' + o.id)">Voir</button>
            <button class="btn-secondary" @click="$router.push('/gestion-orders/' + o.id + '/edit')">Modifier</button>
            <button class="btn-danger" @click="supprimer(o.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

  </section>
</template>

<script setup>
import { store } from "../DataStore";

function supprimer(id) {
  store.orders = store.orders.filter(o => o.id !== id);
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
