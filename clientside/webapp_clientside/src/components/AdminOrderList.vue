<template>
  <div class="admin-container">
    <h1>Order Management</h1>
    <button @click="$router.push('/admin/orders/new')" class="btn-add">➕ Add Order</button>
    <div class="items-list">
      <div v-for="order in orders" :key="order.id" class="item-card">
        <div class="card-header">
          <h3>Order #{{ order.id }}</h3>
          <span :class="['status', order.status.toLowerCase().replace(' ', '-')]">{{ order.status }}</span>
        </div>
        <p class="customer">👤 {{ order.customer }}</p>
        <p class="items">🍕 {{ order.items }}</p>
        <p v-if="order.total" class="total">💰 ${{ order.total }}</p>
        <div class="actions">
          <button @click="$router.push(`/admin/orders/${order.id}`)" class="btn-edit">✏️ Edit</button>
          <button @click="deleteOrder(order.id)" class="btn-delete">🗑️ Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrders, deleteOrder } from "../services/api.js";

export default {
  data() {
    return {
      orders: [],
    };
  },
  async mounted() {
    this.orders = await getOrders();
  },
  methods: {
    async deleteOrder(id) {
      if (confirm("Are you sure?")) {
        await deleteOrder(id);
        this.orders = await getOrders();
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

.items-list {
  display: grid;
  gap: 15px;
}

.item-card {
  border: 2px solid #fbdc7c;
  padding: 15px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.card-header h3 {
  margin: 0;
  color: #5c3b00;
}

.status {
  padding: 5px 10px;
  border-radius: 3px;
  font-weight: bold;
  font-size: 12px;
}

.status.pending {
  background: #e2e3e5;
  color: #383d41;
}

.status.preparing {
  background: #fff3cd;
  color: #856404;
}

.status.on-the-way {
  background: #d1ecf1;
  color: #0c5460;
}

.status.delivered {
  background: #d4edda;
  color: #155724;
}

.customer, .items, .total {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}

.total {
  font-weight: bold;
  color: #8f2e2e;
}

.actions {
  display: flex;
  gap: 5px;
  margin-top: 10px;
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
