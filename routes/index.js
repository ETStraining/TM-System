import userRouter from './userRoutes.js';
import ticketRouter from './ticketsRoutes.js'
// import authRoutes from './authRoutes.js';
import express from 'express';

const allRoutes = express.Router();
allRoutes.use('/users',userRouter);
allRoutes.use('/tickets',ticketRouter);

// allRoutes.use('/auth',authRoutes);

export default allRoutes;