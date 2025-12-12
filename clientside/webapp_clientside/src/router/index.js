import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import PizzaList from "../views/PizzaList.vue";
import RestaurantList from "../views/RestaurantList.vue";
import OrdersList from "../views/OrdersList.vue";
import LoginView from "../views/LoginView.vue";
import OrderCreationView from "../views/OrderCreationView.vue";

// ADMIN
import AdminPizzaList from "../components/AdminPizzaList.vue";
import AdminRestaurantList from "../components/AdminRestaurantList.vue";
import AdminOrderList from "../components/AdminOrderList.vue";

// FORMS
import PizzaForm from "../components/PizzaForm.vue";
import RestaurantForm from "../components/RestaurantForm.vue";
import OrderForm from "../components/OrderForm.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView },
    { path: "/pizzas", component: PizzaList },
    { path: "/restaurants", component: RestaurantList },
    { path: "/orders", component: OrdersList },
    { path: "/login", component: LoginView },
    { path: "/order-create", component: OrderCreationView, meta: { requiresAuth: true } },

    { path: "/admin/pizzas", component: AdminPizzaList, meta: { requiresAdmin: true } },
    { path: "/admin/pizzas/new", component: PizzaForm, meta: { requiresAdmin: true } },
    { path: "/admin/pizzas/:id", component: PizzaForm, meta: { requiresAdmin: true } },

    { path: "/admin/restaurants", component: AdminRestaurantList, meta: { requiresAdmin: true } },
    { path: "/admin/restaurants/new", component: RestaurantForm, meta: { requiresAdmin: true } },
    { path: "/admin/restaurants/:id", component: RestaurantForm, meta: { requiresAdmin: true } },

    { path: "/admin/orders", component: AdminOrderList, meta: { requiresAdmin: true } },
    { path: "/admin/orders/new", component: OrderForm, meta: { requiresAdmin: true } },
    { path: "/admin/orders/:id", component: OrderForm, meta: { requiresAdmin: true } }
  ]
});

// GUARD EXACTEMENT COMME LE PROF
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return next("/login");
  }
  if (to.meta.requiresAdmin) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") return next("/login");
  }
  next();
});

export default router;
