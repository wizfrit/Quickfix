const Quote = require('../models/Quote');
const Request = require('../models/Request');

// Professional creates a quote
const createQuote = async (req, res) => {
    try {
        const { serviceRequest, proposedAmount, estimatedTime } = req.body;

        if (!serviceRequest || !proposedAmount) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const quote = await Quote.create({
            professional: req.user._id,
            serviceRequest,
            proposedAmount,
            estimatedTime: estimatedTime || ''
        });

        res.status(201).json({ message: 'Quote submitted successfully', quote });
    } catch (error) {
        console.error('CreateQuote Error:', error);
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

// Accept a quote: mark this quote accepted, reject others for the same request,
// and update the related Request to record the chosen professional and status.
const acceptQuote = async (req, res) => {
    try {
        const quoteId = req.params.id;
        const quote = await Quote.findById(quoteId);
        if (!quote) return res.status(404).json({ message: 'Quote not found' });

        // Load request to verify ownership
        const request = await Request.findById(quote.serviceRequest);
        if (!request) return res.status(404).json({ message: 'Related request not found' });

        // Only the client who created the request can accept a quote
        if (!req.user || request.client.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to accept this quote' });
        }

        // Update all quotes for this request: accepted for this one, rejected for others
        await Quote.updateMany({ serviceRequest: quote.serviceRequest }, { $set: { status: 'rejected' } });
        quote.status = 'accepted';
        await quote.save();

        // Update the request to link the chosen professional and mark accepted
        request.professional = quote.professional;
        request.status = 'accepted';
        await request.save();

        // Return accepted quote populated
        const populated = await Quote.findById(quote._id).populate('professional', 'name skills rating');
        res.json({ message: 'Quote accepted', quote: populated });
    } catch (error) {
        console.error('AcceptQuote Error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createQuote, getQuotesForRequest, acceptQuote };

