<template>
  <div>
    <h1>Pizza List</h1>
    <div v-if="error">{{ error }}</div>
    <div v-else class="pizzas-grid">
      <div v-for="pizza in pizzas" :key="pizza.id" class="pizza-card">
        <h3>{{ pizza.name }}</h3>
        <p class="price">${{ pizza.price }}</p>
        <p class="ingredients">🍕 {{ pizza.ingredients.join(', ') }}</p>
        <p v-if="pizza.vegetarian" class="veg">✓ Vegetarian</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getPizzas } from "../services/api.js";

export default {
  data() {
    return {
      pizzas: [],
      error: ""
    };
  },
  async mounted() {
    try {
      this.pizzas = await getPizzas();
    } catch (err) {
      this.error = "Unable to load pizzas.";
    }
  }
};
</script>

<style scoped>
.pizzas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.pizza-card {
  border: 2px solid #fbdc7c;
  padding: 15px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.pizza-card h3 {
  margin: 0 0 10px 0;
  color: #5c3b00;
}

.price {
  font-weight: bold;
  color: #8f2e2e;
  font-size: 18px;
}

.ingredients {
  font-size: 12px;
  color: #666;
}

.veg {
  color: green;
  font-weight: bold;
  font-size: 12px;
}
</style>
