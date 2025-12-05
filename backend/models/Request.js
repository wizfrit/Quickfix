const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: false
    },
    urgencyLevel: {
        type: String,
        enum: ['normal', 'urgent'],
        default: 'normal'
    },
    timeSlot: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: ['open', 'accepted', 'in_progress', 'completed', 'cancelled'],
        default: 'open'
    },
    professional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Request', requestSchema);
