const Service = require('../models/Service');

// Get all available services
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

        if (!title || !category || !description || !priceRange) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

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

module.exports = { getAllServices, addService };
