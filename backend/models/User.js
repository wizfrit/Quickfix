const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    role: {
        type: String,
        enum: ['client', 'professional', 'admin'],
        required: true
    },
    skills: {
        type: [String]
    },
    experience: {
        type: Number
    },
    bio: {
        type: String
    },
    profilePicture: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
