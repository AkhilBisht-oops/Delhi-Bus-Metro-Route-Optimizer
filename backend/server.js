const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connectDatabase } = require('./db/database');
const authRoutes = require('./routes/auth');
const routeRoutes = require('./routes/routes');
const scheduleRoutes = require('./routes/schedule');
const transitRoutes = require('./routes/transit');
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(morgan('dev'));

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Delhi Transit API is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/transit', transitRoutes);

// Error handling
app.use(errorHandler);



// Database connection and server start
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();