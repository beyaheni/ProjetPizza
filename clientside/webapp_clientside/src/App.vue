<template>
  <div id="app">

<<<<<<< HEAD
    <!-- ✅ NAVBAR -->
    <nav class="navbar">

      <div class="nav-left">
        <router-link to="/">Home</router-link>
        <router-link to="/pizzas">Pizzas</router-link>
        <router-link to="/restaurants">Restaurants</router-link>
        <router-link to="/orders">Orders</router-link>
      </div>

      <div class="nav-right">
        <div v-if="user" class="user-section">
          <span class="user-name">👤 {{ user.email }}</span>
          <span class="admin-label" v-if="user.role === 'admin'">ADMIN</span>
          <router-link to="/admin/pizzas" class="admin-link" v-if="user.role === 'admin'">
            Dashboard
          </router-link>
          <button @click="logout" class="logout-btn">Sign out</button>
        </div>
        <router-link v-else to="/login" class="login-link">Sign in</router-link>
      </div>

    </nav>

    <!-- ✅ PAGE CONTENT -->
=======
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
>>>>>>> 509f02c2044908ef1fcb89275c7819e564f4996f
    <main>
      <router-view />
    </main>

  </div>
</template>

<script setup>
<<<<<<< HEAD
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(null);

onMounted(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    user.value = JSON.parse(userData);
  }
});

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  user.value = null;
  router.push("/");
}
</script>

<style>
body {
  margin: 0;
  font-family: Georgia, serif;
}

#app {
  min-height: 100vh;
}

/* ✅ NAVBAR FIXE ET PROPRE */
.navbar {
  background: #fbdc7c;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* GROUPES */
.nav-left,
.nav-right {
  display: flex;
  gap: 20px;
  align-items: center;
}

/* LIENS */
.navbar a {
  color: #5c3b00;
  font-weight: bold;
  text-decoration: none;
=======
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
>>>>>>> 509f02c2044908ef1fcb89275c7819e564f4996f
}

.navbar a:hover {
  text-decoration: underline;
}

<<<<<<< HEAD
/* USER SECTION */
.user-section {
  display: flex;
  gap: 15px;
  align-items: center;
}

.user-name {
  color: #5c3b00;
  font-weight: bold;
}

/* ADMIN */
.admin-label {
  color: #8f2e2e;
  font-weight: bold;
  background: #fff5e6;
  padding: 5px 10px;
  border-radius: 3px;
}

.admin-link {
  color: #8f2e2e;
  font-weight: bold;
}

/* BUTTONS */
.login-link,
.logout-btn {
  padding: 8px 15px;
  background: #8f2e2e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
}

.login-link:hover,
.logout-btn:hover {
  background: #6b2323;
=======
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
>>>>>>> 509f02c2044908ef1fcb89275c7819e564f4996f
}

main {
  padding: 20px;
}
</style>
