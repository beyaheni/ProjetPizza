<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { store, getNextId } from "../DataStore";

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => !!route.params.id);

const existing = computed(() =>
  store.restaurants.find(r => r.id === Number(route.params.id))
);

const name = ref(existing.value ? existing.value.name : "");
const city = ref(existing.value ? existing.value.city : "");
const rating = ref(existing.value ? existing.value.rating : 0);

function save() {
  if (isEdit.value && existing.value) {
    existing.value.name = name.value;
    existing.value.city = city.value;
    existing.value.rating = Number(rating.value);
  } else {
    store.restaurants.push({
      id: getNextId("restaurants"),
      name: name.value,
      city: city.value,
      rating: Number(rating.value),
    });
  }

  router.push("/gestion-restaurants");
}

function cancel() {
  router.push("/gestion-restaurants");
}
</script>

<template>
  <section>
    <h1>{{ isEdit ? "Edit Restaurant" : "Create Restaurant" }}</h1>

    <form @submit.prevent="save">

      <div>
        <label>Name</label><br />
        <input v-model="name" />
      </div>

      <div>
        <label>City</label><br />
        <input v-model="city" />
      </div>

      <div>
        <label>Rating</label><br />
        <input type="number" v-model="rating" min="0" max="5" />
      </div>

      <button type="submit">{{ isEdit ? "Save" : "Create" }}</button>
      <button type="button" @click="cancel">Cancel</button>

    </form>
  </section>
</template>
