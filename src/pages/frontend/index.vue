<template>
  <div class="page">
    <div class="container">
      <h1>My Gallery</h1>
      <div class="card-grid">
        <div class="card" v-for="item in items" :key="item.id">
          <img :src="item.image" alt="Thumbnail" />
          <div class="card-body">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref(localStorage.getItem('username'));
const items = [
  {
    id: 1,
    title: 'Beautiful Sunset',
    description: 'A stunning view of the sunset at the beach.',
    image: 'https://static.vecteezy.com/system/resources/previews/036/758/082/non_2x/ai-generated-beautiful-sunset-on-the-beach-sea-waves-and-splashes-photo.jpg',
  },
  {
    id: 2,
    title: 'Mountain Peak',
    description: 'Snowy mountains touching the sky.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ27QWfoF1Zxd-FZYMVtWysCXOT0-r_Dl132g&s',
  },
  {
    id: 3,
    title: 'Forest Trail',
    description: 'Walkway through a dense forest.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiGPqbh2yiBUpcssXROqMTpnOd1JPd27QR7A&s',
  },
  {
    id: 4,
    title: 'City Night Lights',
    description: 'Skyline glowing at night.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlxALQbMenhLg0ilE0h62pADhMBneg6vaZpQ&s',
  },
  {
    id: 5,
    title: 'Ocean Waves',
    description: 'Waves crashing onto the shore.',
    image: 'https://images.newscientist.com/wp-content/uploads/2020/09/16181027/credit_mohamed-khaki-eyeem-getty-images_web.jpg?crop=16:9,smart&width=1200&height=675&upscale=true',
  },
  {
    id: 6,
    title: 'Desert Dunes',
    description: 'Golden sands and hot sun.',
    image: 'https://cdn.britannica.com/42/150942-050-242D5D33/Sand-dunes-Sahara-desert.jpg',
  },
];
</script>

<style scoped>
/* reset */
html, body, .page {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* พื้นหลังฟ้าเต็มจอ */
.page {
  width: 100%;
  min-height: 100vh;
  background: radial-gradient(circle at bottom, #0d1b2a, #000);
  color: #fff;
  position: relative;
  overflow: hidden;
}

/* ดาวระยิบระยับ */
.page::before, .page::after {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 200%; height: 200%;
  background: transparent url("https://www.transparenttextures.com/patterns/stardust.png") repeat;
  animation: moveStars 60s linear infinite;
  opacity: 0.6;
}
.page::after {
  animation-duration: 120s;
  opacity: 0.3;
}
@keyframes moveStars {
  from { transform: translateY(0); }
  to { transform: translateY(-1000px); }
}

/* container */
.container {
  width: 100%;
  padding: 2rem;
  z-index: 1;
  position: relative;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 0 0 10px #00f5d4, 0 0 20px #00f5d4, 0 0 40px #00f5d4;
}

/* card grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

/* card */
.card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.05) rotate(-1deg);
  box-shadow: 0 0 25px rgba(0, 255, 200, 0.6);
}

.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  filter: brightness(0.9) contrast(1.1);
  transition: filter 0.3s ease;
}

.card:hover img {
  filter: brightness(1.1) contrast(1.2) saturate(1.3);
}

.card-body {
  padding: 1rem;
}

.card-body h2 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #fff;
  text-shadow: 0 0 10px #00f5d4, 0 0 20px #00f5d4;
}

.card-body p {
  font-size: 0.9rem;
  color: #ddd;
}
</style>
