import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import allRoutes from "./routes/index.js";
import swaggerJsdoc  from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"


dotenv.config();

app.use(express.json());
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

// Swagger setup

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tickets Management System API",
      version: "1.0.0",
      description: "A simple API for managing tickets operations.",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
