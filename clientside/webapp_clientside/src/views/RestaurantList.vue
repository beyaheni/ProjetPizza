<template>
  <div class="container">
    <h1>Restaurants</h1>

    <div class="toolbar">
      <input v-model="q" placeholder="Rechercher (nom, ville)…" />
      <select v-model="city">
        <option value="">Toutes les villes</option>
        <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
      </select>
      <select v-model="sortBy">
        <option value="rating-desc">Note ↓</option>
        <option value="rating-asc">Note ↑</option>
        <option value="name-asc">Nom A→Z</option>
      </select>
      <label>Note min:
        <input type="number" v-model.number="minRating" min="0" max="5" step="0.1" style="width:5rem" />
      </label>
    </div>

    <p class="meta" v-if="!loading && !error">{{ filteredAndSorted.length }} résultats</p>
    <div v-if="loading">Chargement…</div>
    <div v-else-if="error" class="err">Erreur : {{ error }}</div>

    <div v-else class="grid">
      <div v-for="r in filteredAndSorted" :key="r.id" class="card">
        <h3>{{ r.name }}</h3>
        <p class="muted">{{ r.city }}</p>
        <p>⭐ {{ r.rating }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RestaurantList',
  data(){ 
    return { restaurants:[], loading:true, error:null, q:'', city:'', sortBy:'rating-desc', minRating:0 }
  },
  computed:{
    cities(){
      const set = new Set(this.restaurants.map(r=>r.city))
      return Array.from(set).sort((a,b)=>a.localeCompare(b))
    },
    filteredAndSorted(){
      const q = this.q.toLowerCase().trim()
      let arr = this.restaurants.filter(r=>{
        const matchQ = q ? (r.name.toLowerCase().includes(q) || r.city.toLowerCase().includes(q)) : true
        const matchCity = this.city ? r.city === this.city : true
        const matchRating = r.rating >= this.minRating
        return matchQ && matchCity && matchRating
      })
      switch(this.sortBy){
        case 'rating-desc': arr.sort((a,b)=>b.rating-a.rating); break
        case 'rating-asc':  arr.sort((a,b)=>a.rating-b.rating); break
        case 'name-asc':    arr.sort((a,b)=>a.name.localeCompare(b.name)); break
      }
      return arr
    }
  },
  mounted(){
    fetch('/data/restaurants.json')
      .then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json() })
      .then(d=> this.restaurants = d)
      .catch(e=> this.error = e.message)
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
.grid{ display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:1rem; }
.card{ border:1px solid #eee; border-radius:12px; padding:1rem; background:#fff; box-shadow:0 2px 6px rgba(0,0,0,.05); }
.muted{ opacity:.75; }
.err{ color:#c00; margin:1rem 0; }
</style>
