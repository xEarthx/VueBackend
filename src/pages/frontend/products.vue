<script setup>
import MyCard from "@/pages/frontend/mycard.vue";
//import items from '../Products.json'; 

</script>
<template>
  <main>
    <h1>Products</h1>
    <div class="grid-container">
      <MyCard v-for="item in items" :key="item.id" :id="item.id" :title="item.title" :description="item.description"
        :image="item.image" :price="item.price" />
    </div>
  </main>

</template>
<script scope>
export default {
  name: "Products",
  components: {
    MyCard,
  },

  data() {
    return {
      items: [],
    };
  },
  created() {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(json => {
        this.items = json;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap');

/* Reset & Font */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Noto Sans Thai", sans-serif;
  font-optical-sizing: auto;
}
h1 {
  font-size: 32px;
  color: #333;
  text-align: center;
  font-family: "Noto Sans Thai", sans-serif;
  margin-bottom: 10px;
  margin-top: auto;
  padding: 10px;
  
   
  
}
body {
  background: linear-gradient(to right, #4facfe, #00f2fe);
}

main {
  padding: 1rem;
  background: linear-gradient(to right, #4facfe, #00f2fe);
  padding-top: 180px; /* กันทับ Navbar */
  width: 100%;
  height: 100%;
  min-height: 100vh; /* ให้เต็มความสูงของหน้าจอ */
  overflow: hidden; /* ป้องกันการเลื่อน */
  position: relative; /* เพื่อให้ footer อยู่ด้านล่าง */
  display: flex;
  flex-direction: column;
  align-items: center; /* จัดกลางแนวนอน */
  justify-content: flex-start; /* จัดแนวตั้งเริ่มต้นที่ด้านบน*/
  padding-bottom: 100px; /* กันทับ Footer */
  padding-left: 20px; /* กันทับ Navbar */
  padding-right: 20px; /* กันทับ Navbar */
  padding-top: 10px; /* กันทับ Navbar */
  overflow-x: hidden; /* ป้องกันการเลื่อนแนวนอน */
  overflow-y: auto; /* ให้เลื่อนแนวตั้งได้ */
  font-size: 16px; /* ขนาดตัวอักษรพื้นฐาน */
  color: #333; /* สีตัวอักษรพื้นฐาน */
  line-height: 1.6; /* ระยะห่างระหว่างบรรทัด */
  font-family: "Noto Sans Thai", sans-serif; /* ใช้ฟอนต์ Noto Sans Thai */
  border-radius: 10px;
}

/* Title */
.title-box {
  text-align: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 20px;
  color: #333;
  text-align: center;
  font-family: "Noto Sans Thai", sans-serif;
  font-optical-sizing: auto;
  font-weight: bolder;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 2px solid #ccc;
  width: 100%;
  max-width: 800px; /* จำกัดความกว้างของ title */
  box-sizing: border-box; /* ให้ padding และ border นับรวมในความกว้าง */
  background-color: #f0f0f0; /* พื้นหลังของ title */
}

/* Grid Layout */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto; /* จัดกลางแนวนอน */
  padding-bottom: 100px; /* กันทับ Footer */
  padding-top: 10px; /* กันทับ Navbar */
  padding-left: 20px; /* กันทับ Navbar */
  padding-right: 20px; /* กันทับ Navbar */
  justify-items: center; /* จัดกลางแนวนอน */
  align-items: start; /* จัดกลางแนวตั้ง */
 
}

/* Card Style */
.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  height: 650px;
  text-align: center;
}

/* Image */
.card img {
  display: block;
  margin: 0 auto; /* จัดกลางแนวนอน */
  max-width: 100%;
  max-height: 200px;
  object-fit: contain; /* ให้รูปไม่เบี้ยว */
}

/* Text Content */
.card h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  min-height: 50px;
}

.card .price {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
}

/* Buttons */
.card .btn-detail,
.card .btn-cart {
  width: 80%;
  max-width: 250px;
  margin: 0.5rem auto;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  transition: background-color 0.3s ease;
  text-decoration: none;
}

/* ปุ่มสีเขียว */
.btn-detail {
  background-color: #28a745;
  text-decoration: none;
  color: white;
}
.btn-detail:hover {
  background-color: #218838;
  text-decoration: none;
}

/* ปุ่มสีน้ำเงิน */
.btn-cart {
  background-color: #007bff;
  text-decoration: none;
  color: white;
}
.btn-cart:hover {
  background-color: #0056b3;
  text-decoration: none;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .page-title {
    font-size: 1.6rem;
  }

  .card h3 {
    font-size: 1rem;
  }

  .card .btn-detail,
  .card .btn-cart {
    font-size: 14px;
  }
}
</style>