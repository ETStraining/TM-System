import express from 'express';
import {
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
  getAllTickets
} from '../controllers/ticketController.js';
import authMiddleware from '../middlewares/ticketAuth.js'; // Adjust the path if needed
import authorizeRole from '../middlewares/authRole.js'; // Adjust the path if needed

const router = express.Router();

/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Create a new ticket
 *     description: Create a new ticket with the provided details
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
 *               createdBy:
 *                 type: string
 *                 format: uuid
 *               status:
 *                 type: string
 *                 enum: [New, On-Going, Resolved, Closed]
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       400:
 *         description: Bad request
 */
router.post('/tickets', authMiddleware, createTicket);

/**
 * @swagger
 * /tickets/{id}:
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
router.get('/tickets/:id', authMiddleware, getTicketById);

/**
 * @swagger
 * /tickets/{id}:
 *   put:
 *     summary: Update a ticket
 *     description: Update details of a specific ticket by its ID
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
 *               createdBy:
 *                 type: string
 *                 format: uuid
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
router.put('/tickets/:id', authMiddleware, authorizeRole(['admin', 'support']), updateTicket);

/**
 * @swagger
 * /tickets/{id}:
 *   delete:
 *     summary: Delete a ticket
 *     description: Remove a specific ticket by its ID
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
router.delete('/tickets/:id', authMiddleware, authorizeRole(['admin', 'support']), deleteTicket);

/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Get all tickets
 *     description: Retrieve a list of all tickets with optional filters
 *     tags:
 *       - Tickets
 *     responses:
 *       200:
 *         description: List of tickets
 */
router.get('/tickets', authMiddleware, getAllTickets);

export default router;
