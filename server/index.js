// ✅ Load environment variables first
import dotenv from 'dotenv';
dotenv.config();

// ✅ Import packages
import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import userRoutes from './routes/routes.js';

// ✅ Create express app FIRST
const app = express();

// ✅ Apply middleware
app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true
}));
app.use(express.json());

// ✅ Routes
app.use('/', userRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
