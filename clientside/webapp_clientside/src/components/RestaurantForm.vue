<template>
  <div class="form-container">
    <h2>{{ isEdit ? "Edit Restaurant" : "Add Restaurant" }}</h2>

    <form @submit.prevent="save" class="form">
      <div class="form-group">
        <label>Name :</label>
        <input v-model="restaurant.name" required />
      </div>

      <div class="form-group">
        <label>Address :</label>
        <input v-model="restaurant.address" required />
      </div>

      <div class="form-group">
        <label>City :</label>
        <input v-model="restaurant.city" />
      </div>

      <div class="form-group">
        <label>Rating :</label>
        <input type="number" v-model="restaurant.rating" min="0" max="5" step="0.1" />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary">💾 Save</button>
        <button type="button" @click="$router.back()" class="btn-secondary">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getRestaurant,
  addRestaurant,
  updateRestaurant,
} from "../services/api.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const restaurant = ref({ name: "", address: "", city: "", rating: 4 });
const isEdit = ref(false);

onMounted(async () => {
  if (route.params.id) {
    isEdit.value = true;
    restaurant.value = await getRestaurant(route.params.id);
  }
});

async function save() {
  if (isEdit.value) {
    await updateRestaurant(route.params.id, restaurant.value);
  } else {
    await addRestaurant(restaurant.value);
  }

  router.push("/admin/restaurants");
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #5c3b00;
}

.form-group input[type="text"],
.form-group input[type="number"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-primary, .btn-secondary {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-primary {
  background: #8f2e2e;
  color: white;
}

.btn-primary:hover {
  background: #6b2323;
}

.btn-secondary {
  background: #ddd;
  color: #333;
}

.btn-secondary:hover {
  background: #bbb;
}
</style>