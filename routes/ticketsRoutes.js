import express from 'express';
import {
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
  getAllTickets
} from '../controllers/ticketController.js';
import authMiddleware from '../middlewares/ticketAuth.js'; 
import authorizeRole from '../middlewares/authRole.js'; 

const router = express.Router();

/**
 * @swagger
 * /api/v1/tickets:
 *   post:
 *     summary: Create a new ticket
 *     description: Create a new ticket with the provided details
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pickupDate:
 *                 type: string
 *                 format: date
 *               pickupTime:
 *                 type: string
 *               pickupLocation:
 *                 type: string
 *               dropOffLocation:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', authMiddleware, createTicket);

/**
 * @swagger
 * /api/v1/tickets/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     description: Retrieve details of a specific ticket by its ID
 *     tags:
 *       - Tickets
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Ticket ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket retrieved successfully
 *       404:
 *         description: Ticket not found
 */
router.get('/:id', authMiddleware, getTicketById);

/**
 * @swagger
 * /api/v1/tickets/{id}:
 *   put:
 *     summary: Update a ticket
 *     description: Update details of a specific ticket by its ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tickets
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Ticket ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pickupDate:
 *                 type: string
 *                 format: date
 *               pickupTime:
 *                 type: string
 *               pickupLocation:
 *                 type: string
 *               dropOffLocation:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [New, On-Going, Resolved, Closed]
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Ticket not found
 */
router.put('/:id', authMiddleware, authorizeRole(['admin', 'support']), updateTicket);

/**
 * @swagger
 * /api/v1/tickets/{id}:
 *   delete:
 *     summary: Delete a ticket
 *     description: Remove a specific ticket by its ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tickets
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Ticket ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *       404:
 *         description: Ticket not found
 */
router.delete('/:id', authMiddleware, authorizeRole(['admin', 'support']), deleteTicket);

/**
 * @swagger
 * /api/v1/tickets:
 *   get:
 *     summary: Get all tickets
 *     description: Retrieve a list of all tickets with optional filters
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tickets
 *     responses:
 *       200:
 *         description: List of tickets
 */
router.get('/', authMiddleware, getAllTickets);

export default router;
