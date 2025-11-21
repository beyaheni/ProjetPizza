<template>
  <div id="app">

    <!-- NAVBAR PRINCIPALE -->
    <nav class="navbar">
      <router-link to="/">Accueil</router-link>
      <router-link to="/pizzas">Pizzas</router-link>
      <router-link to="/restaurants">Restaurants</router-link>
      <router-link to="/orders">Commandes</router-link>

      <span class="admin-title">ADMIN</span>

      <router-link to="/gestion-pizzas" class="admin-link">Pizzas</router-link>
      <router-link to="/gestion-restaurants" class="admin-link">Restaurants</router-link>
      <router-link to="/gestion-orders" class="admin-link">Commandes</router-link>
    </nav>

    <!-- PAGE COURANTE -->
    <main>
      <router-view />
    </main>

  </div>
</template>

<script setup>
// pas de logique ici
</script>

<style src="./assets/admin.css"></style>


<style>
body {
  margin: 0;
  font-family: "Georgia", serif;
}

#app {
  min-height: 100vh;
  background: #ffffff;
}

/* NAVBAR */
.navbar {
  background-color: #fbdc7c;
  padding: 15px;
  display: flex;
  gap: 20px;
  align-items: center;
  font-size: 18px;
  border-bottom: 2px solid #e1c25a;
}

.navbar a {
  text-decoration: none;
  color: #5c3b00;
  font-weight: bold;
}

.navbar a:hover {
  text-decoration: underline;
}

/* ADMIN */
.admin-title {
  margin-left: 30px;
  margin-right: 10px;
  color: #8f2e2e;
  font-weight: bold;
  letter-spacing: 1px;
}

.admin-link {
  color: #8f2e2e !important;
}

main {
  padding: 20px;
}
</style>
