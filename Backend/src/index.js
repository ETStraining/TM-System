const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

console.log('DATABASE URI:', process.env.DATABASE);  // This should log your MongoDB URI

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
