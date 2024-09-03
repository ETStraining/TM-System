export const getAllTickets = async (req, res) => {
  try {
      const tickets = await Ticket.find().populate('createdBy', 'fullName email');
      res.json(tickets);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching tickets', error });
  }
};

export const updateTicketStatus = async (req, res) => {
  try {
      const ticket = await Ticket.findByIdAndUpdate(
          req.params.id,
          { status: req.body.status },
          { new: true }
      );
      res.json(ticket);
  } catch (error) {
      res.status(500).json({ message: 'Error updating ticket status', error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
      const users = await User.find().select('fullName email role');
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
  }
};

export const updateUserRole = async (req, res) => {
  try {
      const user = await User.findByIdAndUpdate(
          req.params.id,
          { role: req.body.role },
          { new: true }
      );
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: 'Error updating user role', error });
  }
};

export const getDashboardAnalytics = async (req, res) => {
  try {
      const ticketCount = await Ticket.countDocuments();
      const openTickets = await Ticket.countDocuments({ status: 'open' });
      const closedTickets = await Ticket.countDocuments({ status: 'closed' });
      res.json({ ticketCount, openTickets, closedTickets });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching analytics', error });
  }
};
