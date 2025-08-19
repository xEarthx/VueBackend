<template>
  <div class="navbar">
    <div class="logo">
      <router-link to="/">
        <img :src="logo" alt="Logo" />
      </router-link>
    </div>
    <div class="wrapper">
      <router-link to="/">Home</router-link>
      <router-link to="/products">Products</router-link>

      <template v-if="username">
        <div class="user-info">
          <img :src="avatarUrl" alt="Avatar" class="avatar" />
          <span>{{ username }}</span>
        </div>
        <div class="logout">
          <button class="logout-btn" @click="logout">Logout</button>
        </div>
      </template>

      <div v-else>
        <router-link to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/logo.png";
import emitter from "@/eventBus.js";

export default {
  name: "navbar",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      logo,
    };
  },
  computed: {
    avatarUrl() {
      return this.user?.avatar
        ? `http://localhost:3000/uploads/${this.user.avatar}`
        : "https://dummyimage.com/40x40/cccccc/000000.png&text=Avatar";
    },
    username() {
      return this.user?.username || "";
    },
  },
  created() {
    window.addEventListener("storage", this.syncUser);
    emitter.on("userChanged", this.onUserChanged);
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.syncUser);
    emitter.off("userChanged", this.onUserChanged);
  },
  methods: {
    syncUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    onUserChanged(newUser) {
      this.user = newUser;
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.user = null;
      this.$router.push("/login");
      emitter.emit("userChanged", null);
    },
  },
};

</script>

<style scoped>
/* Navbar Styles */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

.navbar {
  display: flex;
  align-items: center; /* จัดชิดกลางแนวตั้ง */
  background-color: #333;
  padding: 10px 20px;
  font-family: 'Poppins', sans-serif;
  gap: 20px; /* เว้นช่องว่างระหว่าง logo กับ wrapper */
}

.logo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 70px;
  height: 70px;
}

.logo img {
  max-height: 70px;
  width: auto;
  transition: transform 0.3s ease;
}

.logo:hover img {
  transform: scale(1.05);
}

.wrapper {
  flex-grow: 1;  /* ขยายเต็มที่ */
  display: flex;
  justify-content: flex-end; /* เมนูชิดขวา */
  align-items: center;
  gap: 15px;
}

/* เมนูลิงก์ */
.navbar a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 22px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: color 0.3s ease;
}

.navbar a:hover {
  background-color: #4facfe;
  color: white;
}

/* User info */
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

/* Logout button */
.logout-btn {
  padding: 10px 20px;
  background-color: #4facfe;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  white-space: nowrap;
}

.logout-btn:hover {
  background-color: #357ae8;
}

</style>