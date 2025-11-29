const Rating = require('../models/Rating');

// Client submits a rating for a professional
const submitRating = async (req, res) => {
    try {
        const { professional, serviceRequest, rating, review } = req.body;

        if (!professional || !serviceRequest || !rating) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const newRating = await Rating.create({
            client: req.user._id,
            professional,
            serviceRequest,
            rating,
            review
        });

        res.status(201).json({ message: 'Rating submitted successfully', newRating });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all ratings for a professional
const getRatingsForProfessional = async (req, res) => {
    try {
        const { professionalId } = req.params;

        const ratings = await Rating.find({ professional: professionalId }).populate('client', 'name');

        res.json(ratings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { submitRating, getRatingsForProfessional };
