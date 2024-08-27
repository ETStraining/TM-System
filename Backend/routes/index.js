import userRouter from './userRoutes.js';

import express from 'express';
const allRoutes = express.Router();


allRoutes.use('/users',userRouter);


export default allRoutes;