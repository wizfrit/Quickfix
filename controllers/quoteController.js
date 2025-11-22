//const Quote = require('../models/Quote');
/*
// Professional creates a quote
const createQuote = async (req, res) => {
    try {
        const { serviceRequest, proposedAmount, estimatedTime } = req.body;

        const quote = await Quote.create({
            professional: req.user._id,
            serviceRequest,
            proposedAmount,
            estimatedTime
        });

        res.status(201).json({ message: 'Quote submitted successfully', quote });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all quotes for a specific request
const getQuotesForRequest = async (req, res) => {
    try {
        const { requestId } = req.params;

        const quotes = await Quote.find({ serviceRequest: requestId }).populate('professional', 'name skills rating');

        res.json(quotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createQuote, getQuotesForRequest };
*/
const createQuote = async (req, res) => {
    const { serviceRequest, proposedAmount, estimatedTime } = req.body;
    return res.status(201).json({
        message: 'Quote submitted (mocked)',
        quote: {
            id: 'quote123', serviceRequest, proposedAmount, estimatedTime, status: 'pending'
        }
    });
};

const getQuotesForRequest = async (req, res) => {
    return res.json([
        { id: 'quote1', amount: 1000, professional: 'Pro 1' },
        { id: 'quote2', amount: 1200, professional: 'Pro 2' }
    ]);
};

module.exports = { createQuote, getQuotesForRequest };

