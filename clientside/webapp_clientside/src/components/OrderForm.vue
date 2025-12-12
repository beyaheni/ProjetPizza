<template>
  <div class="form-container">
    <h2>{{ isEdit ? "Edit Order" : "Add Order" }}</h2>

    <form @submit.prevent="save" class="form">
      <div class="form-group">
        <label>Customer :</label>
        <input v-model="order.customer" required />
      </div>

      <div class="form-group">
        <label>Items :</label>
        <input v-model="order.items" placeholder="Ordered pizzas" />
      </div>

      <div class="form-group">
        <label>Status :</label>
        <select v-model="order.status">
          <option>Pending</option>
          <option>Preparing</option>
          <option>On the way</option>
          <option>Delivered</option>
        </select>
      </div>

      <div class="form-group">
        <label>Total :</label>
        <input type="number" v-model="order.total" step="0.01" />
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
import { getOrder, addOrder, updateOrder } from "../services/api.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const order = ref({ customer: "", items: "", status: "Pending", total: 0 });
const isEdit = ref(false);

onMounted(async () => {
  if (route.params.id) {
    isEdit.value = true;
    order.value = await getOrder(route.params.id);
  }
});

async function save() {
  if (isEdit.value) {
    await updateOrder(route.params.id, order.value);
  } else {
    await addOrder(order.value);
  }

  router.push("/admin/orders");
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
.form-group input[type="number"],
.form-group select {
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
