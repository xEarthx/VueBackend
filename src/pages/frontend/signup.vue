<template>
  <div class="page-container">
    <div class="signup-box">
      <div class="signup-container">
        <h1>Sign Up</h1>
        <p>Please fill in the form below to create an account.</p>
      </div>
      <form @submit.prevent="signup">
        <label for="fname">First Name:</label>
        <input v-model="form.fname" placeholder="First Name" required />
        <label for="lname">Last Name:</label>
        <input v-model="form.lname" placeholder="Last Name" required />
        <label for="username">Username:</label>
        <input v-model="form.username" placeholder="Username" required />
        <label for="password">Password:</label>
        <input v-model="form.password" type="password" placeholder="Password" required />
        <label for="role">Role:</label>
        <select v-model="form.role" >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <label for="avatar">Avatar:</label>
        <input type="file" @change="handleFile" />
        <button type="submit">Sign Up</button>
        <p>ถ้าคุณมีบัญชีอยู่แล้วเข้าสู่ระบบที่นี่? <router-link to="/login">เข้าสู่ระบบ</router-link>.</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      form: {
        fname: '',
        lname: '',
        username: '',
        password: '',
        avatar: null, // รูปภาพ
        role: 'user', // ค่าเริ่มต้นเป็น user
      },
    };
  },
  methods: {
    handleFile(event) {
      this.form.avatar = event.target.files[0];
    },
    async signup() {
      const formData = new FormData();
      formData.append('fname', this.form.fname);
      formData.append('lname', this.form.lname);
      formData.append('username', this.form.username);
      formData.append('password', this.form.password);
      if (this.form.avatar) {
        formData.append('avatar', this.form.avatar);
      }
      formData.append('role', this.form.role);

      try {
        const res = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          this.form = {
            fname: '',
            lname: '',
            username: '',
            password: '',
            avatar: null,
            role: 'user',
          };
          alert('Signup successful!');
        } 
        else 
        {
          const error = await res.json();
          console.log(error);
          alert('Signup failed: ' + (error.message || 'Unknown error'));
        }
      } 
      catch (err) 
      {
        console.error('Error during signup:', err);
        alert('Error connecting to server');
      }
    },
  },
};
</script>

<style scoped>
.page-container {
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 20px;
  box-sizing: border-box;
}
.signup-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: auto;
  margin-bottom: auto;
  padding: 20px;
 
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #333;
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease;

}

input {
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  color: #333;
  transition: border-color 0.3s ease;
}
input:focus {
  border-color: #4facfe;
  outline: none;
}
select {
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  color: #333;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4facfe;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin: 10px 0;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  background-color: #218838;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.signup-container {
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  color: #333;
  font-size: 18px;
  line-height: 1.5;
}

.signup-container h1 {
  margin-bottom: 10px;
  font-size: 24px;
  color: #333;
  font-weight: bold;
  margin-top: 0;
}

.signup-container p {
  color: #555;
  font-size: 14px;
  margin-bottom: 10px;
  line-height: 1.5;
  text-align: center;
  font-weight: normal;
  margin-top: 0;
}
</style>