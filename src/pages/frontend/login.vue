<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input id="username" v-model="username" type="text" placeholder="Enter username" autocomplete="username"
          required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" placeholder="Enter password"
          autocomplete="current-password" required />
      </div>

      <button type="submit">Login</button>
      <p>ยังไม่มีบัญชี? <router-link to="/signup">สมัครสมาชิกที่นี่</router-link></p>
    </form>
  </div>
</template>

<script>
import emitter from '@/eventBus.js';
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      console.log("Username:", this.username);
      console.log("Password:", this.password);
      try {
        const res = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password
            
          })
        });

        console.log("Status:", res.status); // เพิ่ม
        const data = await res.json();
        console.log("Response:", data);     // เพิ่ม

        
        if (res.ok && data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          emitter.emit("userChanged", data.user); // Emit event for user login
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("avatar", data.user.avatar);
          localStorage.setItem("role", data.user.role);
           
          if (data.user.role === "admin") {
            this.$router.push("/dashboard");
          } else if (data.user.role === "user") {
            this.$router.push("/");
          } else {
            alert("Unknown role");
          }
        } else {
          alert(data.error || "Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Something went wrong");
      }
    }
  }
};
</script>


<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4facfe;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0a56ae;
}
p {
  margin-top: 10px;
   
}
</style>