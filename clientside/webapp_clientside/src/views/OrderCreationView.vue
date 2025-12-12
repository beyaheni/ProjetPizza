<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as api from '@/services/api.js'

const router = useRouter()
const pizzas = ref([])
const selectedPizzas = ref([])
const customer = ref('')
const status = ref('pending')
const loading = ref(true)
const error = ref('')
const success = ref('')

const total = computed(() => {
  return selectedPizzas.value.reduce((sum, id) => {
    const pizza = pizzas.value.find(p => p.id === id)
    return sum + (pizza ? pizza.price : 0)
  }, 0).toFixed(2)
})

onMounted(async () => {
  try {
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      customer.value = user.email
    }
    pizzas.value = await api.getPizzas()
    loading.value = false
  } catch (err) {
    error.value = 'Failed to load pizzas'
    loading.value = false
  }
})

const togglePizza = (pizzaId) => {
  const index = selectedPizzas.value.indexOf(pizzaId)
  if (index > -1) {
    selectedPizzas.value.splice(index, 1)
  } else {
    selectedPizzas.value.push(pizzaId)
  }
}

const isPizzaSelected = (pizzaId) => {
  return selectedPizzas.value.includes(pizzaId)
}

const getSelectedPizzasNames = () => {
  return selectedPizzas.value
    .map(id => pizzas.value.find(p => p.id === id)?.name)
    .filter(Boolean)
    .join(', ')
}

const submitOrder = async () => {
  if (!customer.value) {
    error.value = 'Please enter your name'
    return
  }

  if (selectedPizzas.value.length === 0) {
    error.value = 'Please select at least one pizza'
    return
  }

  try {
    error.value = ''
    success.value = ''
    
    const order = {
      customer: customer.value,
      items: getSelectedPizzasNames(),
      status: status.value,
      total: parseFloat(total.value),
      date: new Date().toISOString()
    }

    await api.addOrder(order)
    success.value = 'Order created successfully!'
    
    setTimeout(() => {
      router.push('/orders')
    }, 1500)
  } catch (err) {
    error.value = 'Failed to create order: ' + (err.response?.data?.error || err.message)
  }
}
</script>

<template>
  <div class="order-creation">
    <div class="container">
      <h1>Create Your Order</h1>
      
      <div v-if="loading" class="loading">Loading pizzas...</div>
      
      <div v-if="error" class="error-message">{{ error }}</div>
      <div v-if="success" class="success-message">{{ success }}</div>

      <div class="order-form">
        <div class="form-group">
          <label>Your Name / Email:</label>
          <input 
            v-model="customer" 
            type="text" 
            placeholder="Enter your name or email"
            disabled
            class="readonly-input"
          />
        </div>

        <div class="form-group">
          <label>Select Pizzas:</label>
          <div class="pizzas-grid">
            <div 
              v-for="pizza in pizzas" 
              :key="pizza.id"
              :class="['pizza-option', { selected: isPizzaSelected(pizza.id) }]"
              @click="togglePizza(pizza.id)"
            >
              <div class="pizza-content">
                <h3>{{ pizza.name }}</h3>
                <p class="ingredients">{{ pizza.ingredients }}</p>
                <p class="vegetarian" v-if="pizza.vegetarian">🌱 Vegetarian</p>
                <p class="price">${{ pizza.price.toFixed(2) }}</p>
              </div>
              <div class="checkbox">
                <input 
                  type="checkbox" 
                  :checked="isPizzaSelected(pizza.id)"
                  @change.stop="togglePizza(pizza.id)"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Order Status:</label>
          <select v-model="status">
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        <div class="order-summary">
          <div class="summary-item">
            <span>Selected Pizzas:</span>
            <span>{{ selectedPizzas.length }} pizza(s)</span>
          </div>
          <div class="summary-item total">
            <span>Total:</span>
            <span>${{ total }}</span>
          </div>
        </div>

        <div class="button-group">
          <button @click="submitOrder" class="btn-submit">Place Order</button>
          <button @click="router.push('/')" class="btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-creation {
  min-height: 100vh;
  background: linear-gradient(135deg, #fbdc7c 0%, #ff9f5a 100%);
  padding: 2rem 1rem;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

h1 {
  text-align: center;
  color: #8f2e2e;
  margin-bottom: 2rem;
  font-size: 2.2rem;
}

.loading, .error-message, .success-message {
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 500;
}

.error-message {
  background-color: #ffe0e0;
  color: #c33;
}

.success-message {
  background-color: #e0ffe0;
  color: #3c3;
}

.order-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 1.05rem;
}

.form-group input,
.form-group select {
  padding: 0.8rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #fbdc7c;
}

.readonly-input {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.pizzas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.pizza-option {
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  background: white;
}

.pizza-option:hover {
  border-color: #fbdc7c;
  box-shadow: 0 4px 12px rgba(251, 220, 124, 0.3);
}

.pizza-option.selected {
  border-color: #8f2e2e;
  background-color: #fff8f0;
  box-shadow: 0 4px 12px rgba(143, 46, 46, 0.2);
}

.pizza-content {
  flex: 1;
}

.pizza-option h3 {
  margin: 0 0 0.5rem 0;
  color: #8f2e2e;
  font-size: 1.1rem;
}

.ingredients {
  font-size: 0.85rem;
  color: #666;
  margin: 0.3rem 0;
}

.vegetarian {
  font-size: 0.85rem;
  color: #28a745;
  margin: 0.3rem 0;
}

.price {
  font-weight: 600;
  color: #fbdc7c;
  margin-top: 0.5rem;
  font-size: 1.1rem;
}

.checkbox {
  display: flex;
  align-items: center;
}

.checkbox input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.order-summary {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #fbdc7c;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #333;
}

.summary-item.total {
  font-size: 1.3rem;
  font-weight: 600;
  color: #8f2e2e;
  border-top: 2px solid #ddd;
  padding-top: 0.8rem;
  margin-top: 0.8rem;
  margin-bottom: 0;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-submit, .btn-cancel {
  padding: 0.9rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-submit {
  background-color: #8f2e2e;
  color: white;
  flex: 1;
  max-width: 200px;
}

.btn-submit:hover {
  background-color: #a63c3c;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(143, 46, 46, 0.3);
}

.btn-cancel {
  background-color: #ddd;
  color: #333;
  flex: 1;
  max-width: 200px;
}

.btn-cancel:hover {
  background-color: #ccc;
}
</style>
