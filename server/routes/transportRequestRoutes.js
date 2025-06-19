const express = require('express');
const router = express.Router();
const {
  createRequest,
  getMyRequests,
  getRequestsForDriver,
  updateRequestStatus
} = require('../controllers/transportRequestController');

const { protect, restrictTo } = require('../middleware/auth');

router.post('/', protect, restrictTo('sender'), createRequest);
router.get('/my-requests', protect, restrictTo('sender'), getMyRequests);
router.get('/driver', protect, restrictTo('driver'), getRequestsForDriver);
router.patch('/:id/status', protect, restrictTo('driver'), updateRequestStatus);

module.exports = router;
