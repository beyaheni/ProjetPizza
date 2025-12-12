<template>
  <div class="admin-container">
    <h1>Restaurant Management</h1>
    <button @click="$router.push('/admin/restaurants/new')" class="btn-add">➕ Add Restaurant</button>
    <div class="items-grid">
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="item-card">
        <h3>{{ restaurant.name }}</h3>
        <p class="address">📍 {{ restaurant.address }}</p>
        <p class="rating">⭐ {{ restaurant.rating }}/5</p>
        <div class="actions">
          <button @click="$router.push(`/admin/restaurants/${restaurant.id}`)" class="btn-edit">✏️ Edit</button>
          <button @click="deleteRestaurant(restaurant.id)" class="btn-delete">🗑️ Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRestaurants, deleteRestaurant } from "../services/api.js";

export default {
  data() {
    return {
      restaurants: [],
    };
  },
  async mounted() {
    this.restaurants = await getRestaurants();
  },
  methods: {
    async deleteRestaurant(id) {
      if (confirm("Are you sure?")) {
        await deleteRestaurant(id);
        this.restaurants = await getRestaurants();
      }
    }
  }
};
</script>

<style scoped>
.admin-container {
  padding: 20px;
}

.btn-add {
  padding: 10px 20px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 20px;
}

.btn-add:hover {
  background: #27ae60;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.item-card {
  border: 2px solid #fbdc7c;
  padding: 15px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.item-card h3 {
  margin: 0 0 10px 0;
  color: #5c3b00;
}

.address {
  font-size: 14px;
  color: #666;
}

.rating {
  font-weight: bold;
  color: #f39c12;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  gap: 5px;
}

.btn-edit, .btn-delete {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  flex: 1;
}

.btn-edit {
  background: #3498db;
  color: white;
}

.btn-edit:hover {
  background: #2980b9;
}

.btn-delete {
  background: #e74c3c;
  color: white;
}

.btn-delete:hover {
  background: #c0392b;
}
</style>
