import { createRouter, createWebHashHistory } from 'vue-router'

// Accueil (ta page d'origine)
import HomeView from '../views/HomeView.vue'

// Pages liste
import PizzaList from '../views/PizzaList.vue'
import RestaurantList from '../views/RestaurantList.vue'
import OrdersList from '../views/OrdersList.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },          // 👈 Accueil revenu
    { path: '/pizzas', name: 'pizzas', component: PizzaList },
    { path: '/restaurants', name: 'restaurants', component: RestaurantList },
    { path: '/orders', name: 'orders', component: OrdersList },
    // 404 simple
    { path: '/:pathMatch(.*)*', name: 'not-found', component: { render: () => '404' } }
  ]
})
