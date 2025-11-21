<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { store, getNextId } from "../DataStore";

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => !!route.params.id);

const existing = computed(() =>
  store.orders.find(o => o.id === Number(route.params.id))
);

const customerName = ref(existing.value ? existing.value.customerName : "");
const pizzaIds = ref(existing.value ? [...existing.value.pizzaIds] : []);
const status = ref(existing.value ? existing.value.status : "pending");
const total = ref(existing.value ? existing.value.total : 0);

function save() {
  if (isEdit.value && existing.value) {
    existing.value.customerName = customerName.value;
    existing.value.pizzaIds = pizzaIds.value;
    existing.value.status = status.value;
    existing.value.total = Number(total.value);
  } else {
    store.orders.push({
      id: getNextId("orders"),
      customerName: customerName.value,
      pizzaIds: pizzaIds.value,
      status: status.value,
      total: Number(total.value),
    });
  }

  router.push("/gestion-orders");
}

function cancel() {
  router.push("/gestion-orders");
}
</script>

<template>
  <section>
    <h1>{{ isEdit ? "Edit Order" : "Create Order" }}</h1>

    <form @submit.prevent="save">
      <div>
        <label>Customer Name</label><br />
        <input v-model="customerName" />
      </div>

      <div>
        <label>Pizzas</label><br />
        <select v-model="pizzaIds" multiple>
          <option v-for="p in store.pizzas" :key="p.id" :value="p.id">
            {{ p.name }}
          </option>
        </select>
      </div>

      <div>
        <label>Status</label><br />
        <select v-model="status">
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <div>
        <label>Total (€)</label><br />
        <input type="number" v-model="total" />
      </div>

      <button type="submit">{{ isEdit ? "Save" : "Create" }}</button>
      <button type="button" @click="cancel">Cancel</button>
    </form>
  </section>
</template>
