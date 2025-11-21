import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";

// Catalogue client
import PizzaList from "../views/PizzaList.vue";
import RestaurantList from "../views/RestaurantList.vue";
import OrdersList from "../views/OrdersList.vue";

// ADMIN Pizzas
import AdminPizzaList from "../components/AdminPizzaList.vue";
import PizzaForm from "../components/PizzaForm.vue";
import PizzaDetail from "../components/PizzaDetail.vue";

// ADMIN Restaurants
import AdminRestaurantList from "../components/AdminRestaurantList.vue";
import RestaurantForm from "../components/RestaurantForm.vue";
import RestaurantDetail from "../components/RestaurantDetail.vue";

// ADMIN Orders
import AdminOrderList from "../components/AdminOrderList.vue";
import OrderForm from "../components/OrderForm.vue";
import OrderDetail from "../components/OrderDetail.vue";

const routes = [
  { path: "/", component: HomeView },


  // ---- CATALOGUE CLIENT ----
  { path: "/pizzas", component: PizzaList },
  { path: "/restaurants", component: RestaurantList },
  { path: "/orders", component: OrdersList },

  // ---- ADMIN PIZZAS ----
  { path: "/gestion-pizzas", component: AdminPizzaList },
  { path: "/gestion-pizzas/new", component: PizzaForm },
  { path: "/gestion-pizzas/:id", component: PizzaDetail, props: true },
  { path: "/gestion-pizzas/:id/edit", component: PizzaForm, props: true },

  // ---- ADMIN RESTAURANTS ----
  { path: "/gestion-restaurants", component: AdminRestaurantList },
  { path: "/gestion-restaurants/new", component: RestaurantForm },
  { path: "/gestion-restaurants/:id", component: RestaurantDetail, props: true },
  { path: "/gestion-restaurants/:id/edit", component: RestaurantForm, props: true },

  // ---- ADMIN COMMANDES ----
  { path: "/gestion-orders", component: AdminOrderList },
  { path: "/gestion-orders/new", component: OrderForm },
  { path: "/gestion-orders/:id", component: OrderDetail, props: true },
  { path: "/gestion-orders/:id/edit", component: OrderForm, props: true },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
