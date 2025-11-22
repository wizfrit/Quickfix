//const Request = require('../models/Request');
/*
// Client places a new service request
const placeRequest = async (req, res) => {
    try {
        const { serviceType, description, location, urgencyLevel, timeSlot } = req.body;

        const request = await Request.create({
            client: req.user._id,
            serviceType,
            description,
            location,
            urgencyLevel,
            timeSlot
        });

        res.status(201).json({ message: 'Request placed successfully', request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Client views all own service requests
const getClientRequests = async (req, res) => {
    try {
        const requests = await Request.find({ client: req.user._id });

        res.json(requests);
    } catch (error) {
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

module.exports = { placeRequest, getClientRequests, getSingleRequest };
*/
const placeRequest = async (req, res) => {
    const { serviceType, description, location, urgencyLevel, timeSlot } = req.body;
    return res.status(201).json({
        message: 'Request placed (mocked)',
        request: {
            id: 'req123', serviceType, description, location, urgencyLevel, timeSlot
        }
    });
};

const getClientRequests = async (req, res) => {
    return res.json([
        { id: 'req123', serviceType: 'Plumbing', status: 'open' },
        { id: 'req456', serviceType: 'Electrician', status: 'completed' }
    ]);
};

const getSingleRequest = async (req, res) => {
    return res.json({
        id: req.params.id,
        serviceType: 'Mocked Service',
        description: 'Fix sink',
        status: 'open'
    });
};

module.exports = { placeRequest, getClientRequests, getSingleRequest };
