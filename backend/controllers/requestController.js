const Request = require('../models/Request');

// Client places a new service request
const placeRequest = async (req, res) => {
    try {
        const { serviceType, description, location, budget, urgencyLevel, timeSlot } = req.body;

        if (!serviceType || !description || !location || !budget) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const request = await Request.create({
            client: req.user._id,
            serviceType,
            description,
            location,
            budget,
            urgencyLevel: urgencyLevel || 'normal',
            timeSlot: timeSlot || null
        });

        res.status(201).json({ message: 'Request placed successfully', request });
    } catch (error) {
        console.error('PlaceRequest Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get requests depending on role:
// - clients: return their own requests
// - professionals: return open requests (available to bid)
const getRequests = async (req, res) => {
    try {
        // If authenticated client, return their own requests
        if (req.user && req.user.role === 'client') {
            const requests = await Request.find({ client: req.user._id })
                .populate('professional', 'name email phoneNumber')
                .sort({ createdAt: -1 });
            return res.json(requests);
        }

        // Otherwise (professionals or unauthenticated) return open requests
        const requests = await Request.find({ $or: [{ status: 'open' }, { status: { $exists: false } }] })
            .populate('professional', 'name email phoneNumber')
            .sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        console.error('GetRequests Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single service request details
const getSingleRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get requests assigned to the authenticated professional (status = accepted)
const getAssignedRequests = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: 'Not authorized' });
        if (req.user.role !== 'professional') return res.status(403).json({ message: 'Only professionals can access assigned requests' });

        const assigned = await Request.find({ professional: req.user._id, status: 'accepted' }).sort({ createdAt: -1 });
        res.json(assigned);
    } catch (error) {
        console.error('GetAssignedRequests Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Mark an assigned request as completed by the professional
const completeRequest = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: 'Not authorized' });
        if (req.user.role !== 'professional') return res.status(403).json({ message: 'Only professionals can complete requests' });

        const request = await Request.findById(req.params.id);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        // Only assigned professional can mark it complete
        if (!request.professional || request.professional.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not assigned to this request' });
        }

        if (request.status !== 'accepted') {
            return res.status(400).json({ message: 'Only accepted requests can be completed' });
        }

        request.status = 'completed';
        await request.save();

        res.json({ message: 'Request marked as completed', request });
    } catch (error) {
        console.error('CompleteRequest Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Submit rating for a completed request
const submitRequestRating = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: 'Not authorized' });
        
        const { requestId, rating } = req.body;

        if (!requestId || !rating) {
            return res.status(400).json({ message: 'Please provide requestId and rating' });
        }

        if (rating < 0 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 0 and 5' });
        }

        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Only the client can rate their request
        if (request.client.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only the client can rate this request' });
        }

        request.rating = rating;
        await request.save();

        res.json({ message: 'Rating submitted successfully', request });
    } catch (error) {
        console.error('SubmitRating Error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { placeRequest, getRequests, getSingleRequest, getAssignedRequests, completeRequest, submitRequestRating };
