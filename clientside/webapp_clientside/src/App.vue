<template>
  <div id="app">

    <!-- NAVBAR -->
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
          <div v-if="user.role === 'admin'" class="admin-links">
            <router-link to="/admin/pizzas" class="admin-link">Pizzas</router-link>
            <router-link to="/admin/restaurants" class="admin-link">Restaurants</router-link>
            <router-link to="/admin/orders" class="admin-link">Orders</router-link>
          </div>
          <button @click="logout" class="logout-btn">Sign out</button>
        </div>
        <router-link v-else to="/login" class="login-link">Sign in</router-link>
      </div>

    </nav>

    <!-- PAGE CONTENT -->
    <main>
      <router-view />
    </main>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)

function refreshUser() {
  const userData = localStorage.getItem('user')
  user.value = userData ? JSON.parse(userData) : null
}

onMounted(() => {
  refreshUser()
  window.addEventListener('auth-changed', refreshUser)
})

onUnmounted(() => {
  window.removeEventListener('auth-changed', refreshUser)
})

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  refreshUser()
  // dispatch event so other components know
  window.dispatchEvent(new CustomEvent('auth-changed'))
  router.push('/')
}
</script>

<style>
body { margin: 0; font-family: Avenir, Helvetica, Arial, sans-serif; }
#app { min-height: 100vh; }
.navbar { background: #fbdc7c; padding: 12px 18px; display:flex; justify-content:space-between; align-items:center; box-shadow:0 2px 6px rgba(0,0,0,0.08); }
.nav-left, .nav-right { display:flex; gap:18px; align-items:center }
.navbar a { color:#5c3b00; font-weight:600; text-decoration:none }
.navbar a:hover { text-decoration:underline }
.user-section { display:flex; gap:12px; align-items:center }
.user-name { color:#5c3b00; font-weight:700 }
.admin-label { color:#8f2e2e; font-weight:700; background:#fff5e6; padding:4px 8px; border-radius:3px }
.admin-link { color:#8f2e2e; font-weight:700; margin-right:8px }
.admin-links { display:flex; gap:8px; align-items:center }
.login-link, .logout-btn { padding:7px 14px; background:#8f2e2e; color:#fff; border-radius:6px; text-decoration:none; border:none; cursor:pointer; font-weight:700 }
.login-link:hover, .logout-btn:hover { background:#6b2323 }
main { padding:18px }
</style>
