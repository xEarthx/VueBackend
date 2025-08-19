<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from './pages/frontend/navbar.vue';
export default {
  components: { Navbar }
};
</script>