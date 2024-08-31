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

// Create a new ticket
router.post('/tickets', authMiddleware, createTicket);

// Get a ticket by ID
router.get('/tickets/:id', authMiddleware, getTicketById);

// Update a ticket
router.put('/tickets/:id', authMiddleware, authorizeRole(['admin', 'support']), updateTicket);

// Delete a ticket
router.delete('/tickets/:id', authMiddleware, authorizeRole(['admin', 'support']), deleteTicket);

// Get all tickets (with optional filters)
router.get('/tickets', authMiddleware, getAllTickets);

export default router;
