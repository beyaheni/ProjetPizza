<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { store, getNextId } from "../DataStore";

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => !!route.params.id);

const existing = computed(() =>
  store.pizzas.find(p => p.id === Number(route.params.id))
);

const name = ref(existing.value ? existing.value.name : "");
const price = ref(existing.value ? existing.value.price : 0);
const ingredients = ref(existing.value ? existing.value.ingredients : "");

function save() {
  if (isEdit.value && existing.value) {
    existing.value.name = name.value;
    existing.value.price = Number(price.value);
    existing.value.ingredients = ingredients.value;
  } else {
    store.pizzas.push({
      id: getNextId("pizzas"),
      name: name.value,
      price: Number(price.value),
      ingredients: ingredients.value,
    });
  }

  router.push("/gestion-pizzas");
}

function cancel() {
  router.push("/gestion-pizzas");
}
</script>

<template>
  <section>
    <h1>{{ isEdit ? "Edit Pizza" : "Create Pizza" }}</h1>

    <form @submit.prevent="save">
      <div>
        <label>Name</label><br />
        <input v-model="name" />
      </div>

      <div>
        <label>Price (€)</label><br />
        <input type="number" v-model="price" />
      </div>

      <div>
        <label>Ingredients</label><br />
        <input v-model="ingredients" />
      </div>

      <button type="submit">{{ isEdit ? "Save" : "Create" }}</button>
      <button type="button" @click="cancel">Cancel</button>
    </form>
  </section>
</template>
