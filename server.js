import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import allRoutes from './routes/index.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import path from 'path';
import sendEmail from './middlewares/sendEmail.js';

dotenv.config();
const app = express();

app.post ('/send-test-email', async (req, res) => {
  const { email, subject, text} = req.body;

  if (!email || !subject || !text) {
    return res.status(404).send('Invalid email');
  } 
  try {
    const result = await sendEmail(email, subject, text);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send('Error sending email');
  }
})
const _dirname = path.resolve ();
app.use(express.json());
app.use (cors({origin:'*'}));
console.log('DATABASE URI:', process.env.DATABASE); // Log MongoDB URI

mongoose.connect(process.env.DATABASE)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API routes
app.use('/api/v1', allRoutes);
// app.use('/api/v1/auth', authRoutes);

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      
      title: 'Ticket Management System API',
      version: '1.0.0',
      description: 'API documentation for the Ticket Management System',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
     {
       url: 'https://tm-system-1.onrender.com',
       description: 'Production server',
     } 
      
    ]
    
    
  },
  apis: ['./routes/*.js'], 


};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
