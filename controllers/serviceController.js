//const Service = require('../models/Service');

// Get all available services
/*
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin/Professional adds a new service
const addService = async (req, res) => {
    try {
        const { title, category, description, priceRange } = req.body;

        const service = await Service.create({
            title,
            category,
            description,
            priceRange
        });

        res.status(201).json({ message: 'Service added successfully', service });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
*/

const getAllServices = async (req, res) => {
    return res.json([
        { id: '1', title: 'Plumbing', category: 'Home Repair' },
        { id: '2', title: 'Electrician', category: 'Maintenance' }
    ]);
};

const addService = async (req, res) => {
    const { title, category, description, priceRange } = req.body;
    return res.status(201).json({
        message: 'Service added (mocked)',
        service: { id: 'srv123', title, category, description, priceRange }
    });
};

module.exports = { getAllServices, addService };
