const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const pool = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');
const moodRoutes = require('./routes/moodRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security Middleware
app.use(helmet()); // Adds secure HTTP headers

// Rate limiting - prevents brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Stricter rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login/register attempts per 15 minutes
  message: 'Too many authentication attempts, please try again later.'
});

// Apply rate limiting
app.use('/api/', limiter); // General rate limit for all API routes
app.use('/api/auth/', authLimiter); // Stricter limit for auth routes

// Other Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.1.189:5173', 'http://192.168.2.138:5173'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);

// Test routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Protected test route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ 
    message: 'You are authenticated!',
    userId: req.userId 
  });
});

app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      message: 'Database connected!', 
      timestamp: result.rows[0].now 
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});