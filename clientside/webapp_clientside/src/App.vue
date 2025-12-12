<template>
  <div id="app">

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
    <main>
      <router-view />
    </main>

  </div>
</template>

<script setup>
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
}

.navbar a:hover {
  text-decoration: underline;
}

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
}

main {
  padding: 20px;
}
</style>
