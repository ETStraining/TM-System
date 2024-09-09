import userRouter from './userRoutes.js';
import ticketRouter from './ticketsRoutes.js';
import adminRouter from './adminRoutes.js';

import express from 'express';

const allRoutes = express.Router();

// Connecting all routes to the main router
allRoutes.use('/users', userRouter);
allRoutes.use('/tickets', ticketRouter); // Use .use() for general routing
allRoutes.use('/dashboard', adminRouter);

export default allRoutes;
