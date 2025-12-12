<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { store } from "../DataStore";

const route = useRoute();
const router = useRouter();

const pizza = computed(() =>
  store.pizzas.find(p => p.id === Number(route.params.id))
);
</script>

<template>
  <section v-if="pizza">
    <h1>Pizza #{{ pizza.id }}</h1>

    <p><strong>Name:</strong> {{ pizza.name }}</p>
    <p><strong>Price:</strong> {{ pizza.price }} €</p>
    <p><strong>Ingredients:</strong> {{ pizza.ingredients }}</p>

    <button @click="router.push('/pizzas')">Back</button>
    <button @click="router.push(`/pizzas/${pizza.id}/edit`)">Edit</button>
  </section>

  <section v-else>
    <p>Pizza not found.</p>
  </section>
</template>
