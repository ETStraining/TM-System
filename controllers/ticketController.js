import Ticket from '../models/ticketsModel.js';
import User from '../models/userModel.js';

// Create a new ticket
export const  createTicket = async (req, res) => {
    try {
        const { pickupDate, pickupTime, pickupLocation, dropOffLocation, dueDate } = req.body;

        // Create a new ticket
        const newTicket = new Ticket({
            pickupDate,
            pickupTime,
            pickupLocation,
            dropOffLocation,
            createdBy: req.user.userId, // Use the authenticated user's ID
            dueDate,
        });

        await newTicket.save();
        res.status(201).json({ message: 'Ticket booked successfully', ticket: newTicket });
    } catch (error) {
        res.status(500).json({ message: 'Error booking ticket', error });
    }
};

// Get a ticket by ID

export const getTicketById = async (req, res) => {
    try {
        console.log('getTicketById triggered with ID:', req.params.id); // Log the ID being requested
        
        const ticket = await Ticket.findById(req.params.id).populate('createdBy', 'fullName email');
        if (!ticket) {
            console.log('Ticket not found');
            return res.status(404).json({ message: 'Ticket not found' });
        }

        console.log('Ticket found:', ticket);
        res.json(ticket);
    } catch (error) {
        console.error('Error fetching ticket:', error); // Log the error
        res.status(500).json({ message: 'Error fetching ticket', error });
    }
};


// Update a ticket
export const updateTicket = async (req, res) => {
    try {
        const { pickupDate, pickupTime, pickupLocation, dropOffLocation, status, dueDate } = req.body;

        // Find and update the ticket
        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { pickupDate, pickupTime, pickupLocation, dropOffLocation, status, dueDate, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.json({ message: 'Ticket updated successfully', ticket: updatedTicket });
    } catch (error) {
        res.status(500).json({ message: 'Error updating ticket', error });
    }
};

// Delete a ticket
export const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ticket', error });
    }
};

// Get all tickets (with optional filters)
export const getAllTickets = async (req, res) => {
    try {
        const { status, fromDate, toDate } = req.query;

        // Build query
        let query = {};
        if (status) query.status = status;
        if (fromDate || toDate) {
            query.pickupDate = {};
            if (fromDate) query.pickupDate.$gte = new Date(fromDate);
            if (toDate) query.pickupDate.$lte = new Date(toDate);
        }

        // Fetch tickets
        const tickets = await Ticket.find(query).populate('createdBy', 'fullName email');
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets', error });
    }
};

