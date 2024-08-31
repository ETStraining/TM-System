import mongoose from 'mongoose';

// Define the Ticket schema
const TicketSchema = new mongoose.Schema({
    pickupDate: { type: Date, required: true },
    pickupTime: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    dropOffLocation: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['New', 'On-Going', 'Resolved', 'Closed'], default: 'New' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    dueDate: { type: Date, default: null },
});

// Middleware to update the `updatedAt` field before saving
TicketSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Create the Ticket model using the schema
const TicketModel = mongoose.model('Ticket', TicketSchema);

export default TicketModel;
