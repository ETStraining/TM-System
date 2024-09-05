import express from 'express';
import { getDashboardStats } from '../controllers/adminController.js';

const adminRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin dashboard
 *
 */

/**
 * @swagger
 * /api/v1/dashboard/getticket:
 *   get:
 *     summary: Retrieve admin dashboard statistics
 *     description: Fetch statistics for total tickets, new tickets, ongoing tickets, resolved tickets, and recent tickets.
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
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalTickets:
 *                       type: integer
 *                       description: Total number of tickets
 *                       example: 150
 *                     newTickets:
 *                       type: integer
 *                       description: Number of new tickets
 *                       example: 30
 *                     ongoingTickets:
 *                       type: integer
 *                       description: Number of tickets in progress
 *                       example: 70
 *                     resolvedTickets:
 *                       type: integer
 *                       description: Number of resolved tickets
 *                       example: 50
 *                     recentTickets:
 *                       type: array
 *                       description: List of the most recent tickets
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: Ticket ID
 *                             example: "64b2fa9e4fce1a3b1c49d3b2"
 *                           createdAt:
 *                             type: string
 *                             description: Creation date of the ticket
 *                             example: "2024-09-01T10:15:20Z"
 *                           status:
 *                             type: string
 *                             description: Current status of the ticket
 *                             example: "new"
 *                           createdBy:
 *                             type: object
 *                             properties:
 *                               fullName:
 *                                 type: string
 *                                 description: Full name of the user who created the ticket
 *                                 example: "John Doe"
 *                               email:
 *                                 type: string
 *                                 description: Email of the user who created the ticket
 *                                 example: "johndoe@example.com"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Error retrieving dashboard statistics"
 *                 error:
 *                   type: string
 *                   description: Details of the error
 *                   example: "Internal Server Error"
 */
adminRouter.get('/getticket', getDashboardStats);

export default adminRouter;
