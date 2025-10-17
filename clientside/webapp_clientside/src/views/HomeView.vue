<script setup>
import pizzaUrl from '@/assets/pizza.png' 
import pizzaMargherita from '@/assets/pizzaMargherita.jpg'
import pizza4Fromages from '@/assets/pizza4fromages.png'
import pizzaReine from '@/assets/pizzareine.png'


// fausses données pour la section "Nos Pizzas"
const pizzas = [
  {
    name: 'Margherita',
    description: 'Tomate, mozzarella, basilic frais.',
    image: pizzaMargherita,
  },
  {
    name: '4 Fromages',
    description: 'Mozzarella, gorgonzola, parmesan, chèvre.',
    image: pizza4Fromages,
  },
  {
    name: 'Reine',
    description: 'Jambon, champignons, olives noires.',
    image: pizzaReine,
  },
]
</script>

<template>
  <div class="home">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-text">
        <h1>🍕 Bienvenue chez ProjetPizza 🍕</h1>
        <p>
          Dégustez nos pizzas artisanales, préparées avec amour et cuites dans un vrai four à bois.
          Découvrez notre sélection unique, directement depuis votre navigateur !
        </p>
        <button class="order-btn">Commander maintenant</button>
      </div>

      <div class="hero-img">
        <img :src="pizzaUrl" alt="Pizza artisanale" />
      </div>
    </section>

    <!-- MENU -->
    <section class="menu">
      <h2>Nos Pizzas Favorites</h2>
      <div class="pizzas">
        <div class="pizza-card" v-for="p in pizzas" :key="p.name">
          <img :src="p.image" :alt="p.name" />
          <h3>{{ p.name }}</h3>
          <p>{{ p.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #333;
}

/* --- HERO --- */
.hero {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  background-color: #fff8ef;
}
.hero-text {
  flex: 1 1 400px;
  padding: 2rem;
  text-align: left;
}
.hero-text h1 {
  font-size: 2.8rem;
  color: #ff6600;
  margin-bottom: 1rem;
  animation: fadeInUp 0.8s ease-out both;
}
.hero-text p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #444;
  line-height: 1.6;
}
.order-btn {
  background-color: #ff6600;
  color: #fff;
  padding: 0.8rem 1.6rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s ease;
}
.order-btn:hover {
  transform: scale(1.05);
  background-color: #ff7a1a;
}
.hero-img {
  flex: 1 1 400px;
  text-align: center;
}
.hero-img img {
  width: 90%;
  max-width: 500px;
  border-radius: 14px;
  animation: fadeInUp 1s ease-out both, gentleFloat 6s ease-in-out 1s infinite;
}

/* --- MENU --- */
.menu {
  padding: 3rem 1rem;
  text-align: center;
  background-color: #fff2e6;
}
.menu h2 {
  color: #e55300;
  margin-bottom: 2rem;
  font-size: 2rem;
}
.pizzas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}
.pizza-card {
  width: 260px;
  background-color: #fff;
  border-radius: 14px;
  box-shadow: 0 6px 12px rgba(0,0,0,.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.pizza-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0,0,0,.15);
}
.pizza-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
}
.pizza-card h3 {
  color: #ff6600;
  margin: 1rem 0 0.5rem;
}
.pizza-card p {
  color: #444;
  font-size: 0.9rem;
  padding: 0 1rem 1rem;
}

/* --- Animations --- */
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(15px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes gentleFloat {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
</style>
