<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { store } from "../DataStore";

const route = useRoute();
const router = useRouter();

const order = computed(() =>
  store.orders.find(o => o.id === Number(route.params.id))
);
</script>

<template>
  <section v-if="order">
    <h1>Order #{{ order.id }}</h1>

    <p><strong>Customer:</strong> {{ order.customerName }}</p>
    <p><strong>Status:</strong> {{ order.status }}</p>
    <p><strong>Total:</strong> {{ order.total }} €</p>

    <h3>Pizzas:</h3>
    <ul>
      <li v-for="id in order.pizzaIds" :key="id">
        {{ store.pizzas.find(p => p.id === id)?.name }}
      </li>
    </ul>

    <button @click="router.push('/gestion-orders')">Back</button>
    <button @click="router.push(`/gestion-orders/${order.id}/edit`)">Edit</button>
  </section>

  <section v-else>
    <p>Order not found.</p>
  </section>
</template>
