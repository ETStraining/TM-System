/**
 * @openapi
 * /admin/tickets:
 *   get:
 *     tags:
 *       - Tickets
 *     summary: Get all tickets
 *     description: Retrieves a list of all tickets.
 *     responses:
 *       200:
 *         description: A list of tickets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *       500:
 *         description: Error fetching tickets.
 */

/**
 * @openapi
 * /admin/tickets/{id}/status:
 *   put:
 *     tags:
 *       - Tickets
 *     summary: Update ticket status
 *     description: Updates the status of a specific ticket.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the ticket to update.
 *         schema:
 *           type: string
 *       - name: status
 *         in: body
 *         required: true
 *         description: The new status of the ticket.
 *         schema:
 *           type: string
 *           example: "closed"
 *     responses:
 *       200:
 *         description: The updated ticket.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: Ticket not found.
 *       500:
 *         description: Error updating ticket status.
 */

/**
 * @openapi
 * /admin/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Retrieves a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error fetching users.
 */

/**
 * @openapi
 * /admin/users/{id}/role:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user role
 *     description: Updates the role of a specific user.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *       - name: role
 *         in: body
 *         required: true
 *         description: The new role of the user.
 *         schema:
 *           type: string
 *           example: "admin"
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error updating user role.
 */

/**
 * @openapi
 * /admin/analytics:
 *   get:
 *     tags:
 *       - Analytics
 *     summary: Get dashboard analytics
 *     description: Retrieves analytics data for the dashboard.
 *     responses:
 *       200:
 *         description: Analytics data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticketCount:
 *                   type: integer
 *                   example: 150
 *                 openTickets:
 *                   type: integer
 *                   example: 45
 *                 closedTickets:
 *                   type: integer
 *                   example: 105
 *       500:
 *         description: Error fetching analytics data.
 */

import express from 'express';
import authMiddleware from '../middlewares/adminMiddlewares';
import { getAllTickets, updateTicketStatus, getAllUsers, updateUserRole, getDashboardAnalytics } from '../controllers/adminController';

const router = express.Router();

router.get('/admin/tickets', authMiddleware, getAllTickets);
router.put('/admin/tickets/:id/status', authMiddleware, updateTicketStatus);
router.get('/admin/users', authMiddleware, getAllUsers);
router.put('/admin/users/:id/role', authMiddleware, updateUserRole);
router.get('/admin/analytics', authMiddleware, getDashboardAnalytics);

export default router;
