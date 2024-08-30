import userRouter from './userRoutes.js';
// import authRoutes from './authRoutes.js';
import express from 'express';

const allRoutes = express.Router();


allRoutes.use('/users',userRouter);

// allRoutes.use('/auth',authRoutes);

export default allRoutes;