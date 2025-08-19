const express = require ('express');
const cors = require ('cors');
const app = express();
const port = 3000;//ใช้กับค่าที่ไม่มีการเปลี่ยนแปลง
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require ('mysql2');

const con  = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb'
});

const compare = bcrypt.compare;
const hash = bcrypt.hash;
const verify = jwt.verify;
const sign = jwt.sign;
 

// ใช้ body-parser เพื่อแปลง JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ใช้ cors เพื่ออนุญาตการเข้าถึงจากโดเมนอื่น
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
// ใช้ express.static เพื่อให้สามารถเข้าถึงไฟล์ static ได้
app.use(express.static('public'));

// ใช้ jwt สำหรับการยืนยันตัวตน
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; 
  const token = authHeader && authHeader.split(' ')[1]; // ตัดคำว่า Bearer ออก

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};
// นำเข้า multer สำหรับการอัปโหลดไฟล์
const multer = require('multer');
const path = require('path');
// ตั้งค่า multer สำหรับการอัปโหลดรูป
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage }); // เรียกใช้ multer

// ตั้งค่า serve static ไฟล์ในโฟลเดอร์ uploads
app.use('/uploads', express.static('uploads'));

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username or password missing' });
  }

  const sql = 'SELECT * FROM users WHERE username = ?';

  con.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: 'Internal server error' });

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
      if (bcryptErr) return res.status(500).json({ error: 'Internal server error' });

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // สร้าง JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        'your_secret_key',
        { expiresIn: '1h' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          avatar: user.avatar
        }
      });
    });
  });
});

 
// GET: ดึงข้อมูลผู้ใช้ทั้งหมด
app.get('/users', (req, res) => {
  con.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
}); 
// GET: ดึงข้อมูลผู้ใช้ตาม ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  con.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(results[0]);
  });
});

app.get('/dashboard', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }
  res.json({ message: `Welcome Admin, ${req.user.username}!` });
});

app.post('/signup', upload.single('avatar'), async (req, res) => {
  const { fname, lname, username, password, role } = req.body;
  const avatar = req.file?.filename || null;

  if (!fname || !lname || !username || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = await hash(password, 10);
  // 10 = salt (การสุ่มค่าเพื่อเพิ่มความซับซ้อนในการเข้ารหัส)
  // และมันจะถูกนำมาใช้ตอน compare
  const sql = `INSERT INTO users (fname, lname, username, password, avatar, role)
               VALUES (?, ?, ?, ?, ?, ?)`;

  con.query(sql, [fname, lname, username, hashedPassword, avatar, role], (err, result) => {
    if (err) {
      console.error("❌ DB Error:", err);  // เช็ก error
      return res.status(500).json({ message: 'Database error', error: err });
    }
    console.log("✅ Insert success:", result); // จะมี insertId
    res.status(201).json({ message: 'Signup successful' });
  });
});



// UPDATE: แก้ไขผู้ใช้
app.put('/users/:id', (req, res) => {
  const { fname, lname, username } = req.body;
  const { id } = req.params;
  con.query(
    'UPDATE users SET fname = ?, lname = ?, username = ? WHERE id = ?',
    [fname, lname, username, id],
    (err) => {
      if (err) throw err;
      res.json({ message: 'User updated' });
    }
  );
});

// DELETE: ลบผู้ใช้
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  con.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'User deleted' });
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});