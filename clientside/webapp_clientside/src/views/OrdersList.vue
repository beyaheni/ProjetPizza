<template>
  <div>
    <h1>My Orders</h1>
    <div v-if="error">{{ error }}</div>
    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <h3>Order #{{ order.id }}</h3>
          <span :class="['status', order.status.toLowerCase()]">{{ order.status }}</span>
        </div>
        <p><strong>Customer:</strong> {{ order.customer }}</p>
        <p><strong>Items:</strong> {{ order.items }}</p>
        <p v-if="order.total"><strong>Total:</strong> ${{ order.total }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrders } from "../services/api.js";

export default {
  data() {
    return {
      orders: [],
      error: ""
    };
  },
  async mounted() {
    try {
      this.orders = await getOrders();
    } catch (err) {
      this.error = "Unable to load orders.";
    }
  }
};
</script>

<style scoped>
.orders-list {
  display: grid;
  gap: 15px;
}

.order-card {
  border: 2px solid #fbdc7c;
  padding: 15px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.order-header h3 {
  margin: 0;
  color: #5c3b00;
}

.status {
  padding: 5px 10px;
  border-radius: 3px;
  font-weight: bold;
  font-size: 12px;
}

.status.preparing {
  background: #fff3cd;
  color: #856404;
}

.status.delivered {
  background: #d4edda;
  color: #155724;
}

.status.on\ the\ way {
  background: #d1ecf1;
  color: #0c5460;
}

.status.pending {
  background: #e2e3e5;
  color: #383d41;
}
</style>
