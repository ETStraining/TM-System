const mongoose = require('mongoose');

// Define the Ticket schema
const TicketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['New', 'On-Going', 'Resolved', 'Closed'],
        default: 'New',
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium',
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        default: null,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        default: null,
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

// Middleware to update the `updatedAt` field before saving
TicketSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Create the Ticket model using the schema
const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;