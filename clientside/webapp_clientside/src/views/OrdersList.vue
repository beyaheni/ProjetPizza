<template>
  <div class="container">
    <h1>Commandes</h1>

    <div v-if="loading">Chargement…</div>
    <div v-else-if="error" class="err">Erreur : {{ error }}</div>

    <table v-else>
      <thead>
        <tr>
          <th>N°</th>
          <th>Client</th>
          <th>Articles</th>
          <th>Total (€)</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="o in orders" :key="o.id">
          <td>{{ o.id }}</td>
          <td>{{ o.customer }}</td>
          <td>{{ o.items }}</td>
          <td>{{ o.total.toFixed(2) }}</td>
          <td>{{ o.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'OrdersList',
  data() {
    return {
      orders: [],
      loading: true,
      error: null
    }
  },
  mounted() {
    fetch('/data/orders.json')
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return res.json()
      })
      .then(data => (this.orders = data))
      .catch(err => (this.error = err.message))
      .finally(() => (this.loading = false))
  }
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 2rem auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
th, td {
  padding: .6rem;
  border-bottom: 1px solid #eee;
  text-align: left;
}
th {
  background: #fff3cd;
}
.err { color: #c00; margin: 1rem 0; }
</style>
