<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/">Accueil</router-link>
      <router-link to="/pizzas">Nos Pizzas</router-link>
      <router-link to="/contact">Contact</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default { name: "App" };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
.navbar {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  background-color: #ffcc00;
}
.navbar a {
  text-decoration: none;
  color: #000;
  font-weight: bold;
}
</style>
