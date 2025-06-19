const mongoose = require('mongoose');

const transportRequestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'driver',
    required: true
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  package: {
    dimensions: {
      length: { type: Number, required: true }, // cm
      width: { type: Number, required: true },
      height: { type: Number, required: true }
    },
    weight: {
      type: Number, // kg
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['food', 'fragile', 'electronics', 'clothing', 'other']
    },
    description: {
      type: String
    }
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'delivered'],
    default: 'pending'
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  deliveryDate: {
    type: Date
  }
});

module.exports = mongoose.model('TransportRequest', transportRequestSchema);
