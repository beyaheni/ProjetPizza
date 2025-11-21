<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { store } from "../DataStore";

const route = useRoute();
const router = useRouter();

const restaurant = computed(() =>
  store.restaurants.find(r => r.id === Number(route.params.id))
);
</script>

<template>
  <section v-if="restaurant">
    <h1>Restaurant #{{ restaurant.id }}</h1>

    <p><strong>Name:</strong> {{ restaurant.name }}</p>
    <p><strong>City:</strong> {{ restaurant.city }}</p>
    <p><strong>Rating:</strong> {{ restaurant.rating }}</p>

    <button @click="router.push('/gestion-restaurants')">Back</button>
    <button @click="router.push(`/gestion-restaurants/${restaurant.id}/edit`)">Edit</button>
  </section>

  <section v-else>
    <p>Restaurant not found.</p>
  </section>
</template>
