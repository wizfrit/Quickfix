//const Rating = require('../models/Rating');
/*
// Client submits a rating for a professional
const submitRating = async (req, res) => {
    try {
        const { professional, serviceRequest, rating, review } = req.body;

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
*/
const submitRating = async (req, res) => {
    const { professional, serviceRequest, rating, review } = req.body;
    return res.status(201).json({
        message: 'Rating submitted (mocked)',
        rating: { professional, serviceRequest, rating, review }
    });
};

const getRatingsForProfessional = async (req, res) => {
    return res.json([
        { client: 'client1', rating: 5, review: 'Excellent job!' },
        { client: 'client2', rating: 4, review: 'Good work' }
    ]);
};

module.exports = { submitRating, getRatingsForProfessional };
