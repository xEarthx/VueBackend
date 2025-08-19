<template>
  
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
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
}

.card-body h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #222;
}

.card-body p {
  font-size: 0.9rem;
  color: #555;
}
</style>