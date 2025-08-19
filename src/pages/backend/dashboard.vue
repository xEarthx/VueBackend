<template>
  <div class="dashboard">
    <h1>Welcome , {{ username }}</h1>
    <h2>User Management</h2>
   
    

      <table border="1" cellpadding="8">
        <thead>
          <tr>
            <th>No</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td v-if="editId !== user.id">{{ user.fname }} {{ user.lname }}</td>
            <td v-else>
              <input v-model="editForm.fname" placeholder="First Name" />
              <input v-model="editForm.lname" placeholder="Last Name" />
            </td>
            <td v-if="editId !== user.id">{{ user.username }}</td>
            <td v-else>
              <input v-model="editForm.username" placeholder="Username" />
            </td>
            <td>
              <button v-if="editId !== user.id" @click="startEdit(user)">Edit</button>
              <button v-else @click="saveEdit(user.id)">Save</button>
              <button v-if="editId === user.id" @click="cancelEdit">Cancel</button>
              <button @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
 
const router = useRouter();

const users = ref([]);
const editId = ref(null);
const editForm = ref({ fname: '', lname: '', username: '' });
const username = ref(localStorage.getItem('username') || '');

const token = localStorage.getItem('token');
if (!token) {
  router.push('/login'); // ถ้าไม่มี token ให้กลับไปหน้า login
}

const fetchUsers = async () => {
  try {
    const res = await fetch('http://localhost:3000/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
    users.value = await res.json();
  } catch (err) {
    alert('Please login again');
    localStorage.clear();
    router.push('/login');
  }
};

const startEdit = (user) => {
  editId.value = user.id;
  editForm.value = { ...user };
};

const cancelEdit = () => {
  editId.value = null;
  editForm.value = { fname: '', lname: '', username: '' };
};

const saveEdit = async (id) => {
  try {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editForm.value),
    });
    editId.value = null;
    fetchUsers();
  } catch (err) {
    alert('Failed to update user');
  }
};

const deleteUser = async (id) => {
  if (confirm('คุณต้องการลบ user นี้ใช่หรือไม่?')) {
    try {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch {
      alert('Failed to delete user');
    }
  }
};

const logout = () => {
  localStorage.clear();
  router.push('/login');
};

onMounted(fetchUsers);
</script>
<style scoped>
.dashboard {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #ddd;
}

.navbar {
  background-color: #333;
  color: white;
  padding: 10px 10px;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
}

.logo img {
  height: 60px;
}
</style>