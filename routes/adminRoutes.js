import express from 'express';
import { getDashboardStats } from '../controllers/adminController.js';

const adminRouter = express.Router();

/**
 * @swagger
 * /api/v1/dashboard/getticket:
 *   get:
 *     summary: Retrieve admin dashboard statistics
 *     description: Fetch various statistics related to ticket management from the admin dashboard.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Successfully retrieved dashboard stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalTickets:
 *                   type: integer
 *                   description: Total number of tickets
 *                   example: 150
 *                 resolvedTickets:
 *                   type: integer
 *                   description: Number of tickets resolved
 *                   example: 100
 *                 pendingTickets:
 *                   type: integer
 *                   description: Number of tickets still pending
 *                   example: 50
 *       500:
 *         description: Internal server error
 */
adminRouter.get('/getticket', getDashboardStats);

export default adminRouter;
