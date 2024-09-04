import express from 'express';
import { getDashboardStats } from '../controllers/adminController.js';

const adminRouter = express.Router();

// Admin dashboard route
adminRouter.get('/getticket', getDashboardStats);

export default adminRouter;
