const Payment = require('../models/Payment');

// Post a payment
const postPayment = async (req, res) => {
    try {
        const { serviceRequest, amount, paymentMethod } = req.body;

        if (!serviceRequest || !amount || !paymentMethod) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const payment = await Payment.create({
            user: req.user._id,
            serviceRequest,
            amount,
            paymentMethod,
            paymentStatus: 'completed'
        });

        res.status(201).json({ message: 'Payment recorded successfully', payment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get payment for a service request
const getPaymentByRequest = async (req, res) => {
    try {
        const { requestId } = req.params;

        const payment = await Payment.findOne({ serviceRequest: requestId });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { postPayment, getPaymentByRequest };
