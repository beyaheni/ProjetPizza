<template>
  <div class="container">
    <h1>Nos Pizzas</h1>

    <div class="toolbar">
      <input v-model="q" placeholder="Rechercher par nom ou ingrédient…" />
      <label><input type="checkbox" v-model="onlyVeg" /> Végétariennes seulement</label>
      <select v-model="sortBy">
        <option value="price-asc">Prix ↑</option>
        <option value="price-desc">Prix ↓</option>
        <option value="name-asc">Nom A→Z</option>
      </select>
    </div>

    <p class="meta" v-if="!loading && !error">{{ filteredAndSorted.length }} résultats</p>
    <div v-if="loading">Chargement…</div>
    <div v-else-if="error" class="err">Erreur : {{ error }}</div>

    <div v-else class="grid">
      <div v-for="p in filteredAndSorted" :key="p.id" class="card">
        <h3>{{ p.name }}</h3>
        <p class="ing">{{ p.ingredients.join(', ') }}</p>
        <p class="price"><strong>{{ p.price.toFixed(2) }} €</strong></p>
        <span :class="['badge', p.vegetarian ? 'veg' : 'non-veg']">
          {{ p.vegetarian ? 'Végétarienne' : 'Classique' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PizzaList',
  data() {
    return {
      pizzas: [],
      loading: true,
      error: null,
      q: '',
      onlyVeg: false,
      sortBy: 'price-asc'
    }
  },
  computed: {
    filteredAndSorted() {
      const q = this.q.toLowerCase().trim()
      let arr = this.pizzas.filter(p => {
        const matchName = p.name.toLowerCase().includes(q)
        const matchIng  = p.ingredients.join(' ').toLowerCase().includes(q)
        const vegOk = this.onlyVeg ? p.vegetarian : true
        return (q ? (matchName || matchIng) : true) && vegOk
      })
      switch (this.sortBy) {
        case 'price-asc':  arr.sort((a,b)=>a.price-b.price); break
        case 'price-desc': arr.sort((a,b)=>b.price-a.price); break
        case 'name-asc':   arr.sort((a,b)=>a.name.localeCompare(b.name)); break
      }
      return arr
    }
  },
  mounted() {
    fetch('/data/pizzas.json')
      .then(r => { if (!r.ok) throw new Error('HTTP '+r.status); return r.json() })
      .then(d => this.pizzas = d)
      .catch(e => this.error = e.message)
      .finally(()=> this.loading = false)
  }
}
</script>

<style scoped>
.container{ max-width: 1000px; margin: 2rem auto; }
.toolbar{ display:flex; flex-wrap:wrap; gap:.75rem; align-items:center; margin:1rem 0; }
.toolbar input{ flex:1; padding:.5rem; }
.toolbar select{ padding:.5rem; }
.meta{ opacity:.7; margin:.25rem 0 1rem; }
.grid{ display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; }
.card{ border:1px solid #eee; border-radius:12px; padding:1rem; background:#fffbea; box-shadow:0 2px 6px rgba(0,0,0,.05); }
.ing{ min-height: 2.6em; }
.price{ margin:.5rem 0; }
.badge{ display:inline-block; padding:.25rem .5rem; border-radius:8px; color:#fff; font-size:.8rem; }
.veg{ background:#2e7d32; }
.non-veg{ background:#d32f2f; }
.err{ color:#c00; margin:1rem 0; }
</style>
