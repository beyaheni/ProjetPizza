<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/">Accueil</router-link>
      <router-link to="/pizzas">Pizzas</router-link>
      <router-link to="/restaurants">Restaurants</router-link>
      <router-link to="/orders">Commandes</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default { name: 'App' }
</script>

<style scoped>
.navbar{ display:flex; gap:1rem; justify-content:center; background:#ffe082; padding:1rem }
.router-link-active{ font-weight:700; color:#d32f2f }
</style>

