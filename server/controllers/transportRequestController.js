const TransportRequest = require('../models/TransportRequest');
const Trip = require('../models/Trip');

// @desc    Create a new transport request
// @route   POST /api/requests
// @access  Private (Sender)
exports.createRequest = async (req, res) => {
  try {
    const { trip, package } = req.body;

    const request = new TransportRequest({
      sender: req.user._id,
      trip,
      package
    });

    await request.save();

    res.status(201).json({ message: 'Request created successfully', data: request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating request' });
  }
};

// @desc    Get all requests by the sender (logged-in user)
// @route   GET /api/requests/my-requests
// @access  Private (Sender)
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await TransportRequest.find({ sender: req.user._id })
      .populate('trip')
      .sort({ requestDate: -1 });

    res.status(200).json({ requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching requests' });
  }
};

// @desc    Get requests for a driver's trips
// @route   GET /api/requests/driver
// @access  Private (Driver)
exports.getRequestsForDriver = async (req, res) => {
  try {
    const trips = await Trip.find({ driver: req.user._id }).select('_id');
    const tripIds = trips.map(t => t._id);

    const requests = await TransportRequest.find({ trip: { $in: tripIds } })
      .populate('sender', 'name email')
      .populate('trip');

    res.status(200).json({ requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching driver requests' });
  }
};

// @desc    Update request status (accept/reject/deliver)
// @route   PATCH /api/requests/:id/status
// @access  Private (Driver)
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await TransportRequest.findById(req.params.id).populate('trip');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.trip.driver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this request' });
    }

    if (!['accepted', 'rejected', 'delivered'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    request.status = status;
    if (status === 'delivered') {
      request.deliveryDate = new Date();
    }

    await request.save();

    res.status(200).json({ message: 'Status updated', data: request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update request status' });
  }
};
