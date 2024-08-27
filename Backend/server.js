import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import allRoutes from "./routes/index.js";
dotenv.config();

console.log('DATABASE URI:', process.env.DATABASE);  // This should log your MongoDB URI

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// API routes
app.use("/api/v1", allRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
