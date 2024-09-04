import Ticket from '../models/ticketsModel.js';

// Dashboard controller for admin
export const getDashboardStats = async (req, res) => {
  try {
    //  Count all tickets
    const totalTickets = await Ticket.countDocuments();

    //  Count new tickets (status: 'new')
    const newTickets = await Ticket.countDocuments({ status: 'new' });

    //  Count on-going tickets (status: 'on-going')
    const ongoingTickets = await Ticket.countDocuments({ status: 'on-going' });

    //  Count resolved tickets (status: 'resolved')
    const resolvedTickets = await Ticket.countDocuments({ status: 'resolved' });

    //  Fetch the latest tickets (let's say, last 5 tickets)
    const recentTickets = await Ticket.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('createdBy', 'fullName email');

    // Return the stats along with the recent tickets
    res.status(200).json({
      success: true,
      data: {
        totalTickets,
        newTickets,
        ongoingTickets,
        resolvedTickets,
        recentTickets,  
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving dashboard statistics',
      error: error.message,
    });
  }
};
export default getDashboardStats