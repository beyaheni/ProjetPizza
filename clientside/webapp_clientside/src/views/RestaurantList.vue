<template>
  <div>
    <h1>Restaurant List</h1>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant-card">
        <h3>{{ restaurant.name }}</h3>
        <p>📍 {{ restaurant.address }}</p>
        <p>⭐ {{ restaurant.rating }}/5</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getRestaurants } from "../services/api.js";

export default {
  data() {
    return {
      restaurants: [],
      error: ""
    };
  },
  async mounted() {
    try {
      this.restaurants = await getRestaurants();
    } catch (err) {
      this.error = "Unable to load restaurants.";
    }
  }
};
</script>

<style scoped>
.restaurant-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
}
</style>
