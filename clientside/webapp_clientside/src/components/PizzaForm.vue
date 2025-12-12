<template>
  <div class="form-container">
    <h2>{{ isEdit ? "Edit Pizza" : "Add Pizza" }}</h2>

    <form @submit.prevent="save" class="form">
      <div class="form-group">
        <label>Name :</label>
        <input v-model="pizza.name" required>
      </div>

      <div class="form-group">
        <label>Price :</label>
        <input type="number" v-model="pizza.price" step="0.01" required>
      </div>

      <div class="form-group">
        <label>Ingredients :</label>
        <input v-model="pizza.ingredients" placeholder="Separated by commas">
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="pizza.vegetarian">
          Vegetarian
        </label>
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
import { getPizza, addPizza, updatePizza } from "../services/api.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const pizza = ref({ name: "", price: 0, ingredients: [], vegetarian: false });
const isEdit = ref(false);

onMounted(async () => {
  if (route.params.id) {
    isEdit.value = true;
    pizza.value = await getPizza(route.params.id);
  }
});

async function save() {
  if (isEdit.value) {
    await updatePizza(route.params.id, pizza.value);
  } else {
    await addPizza(pizza.value);
  }

  router.push("/admin/pizzas");
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

.form-group input[type="checkbox"] {
  margin-right: 5px;
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