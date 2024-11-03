// backend/models/Bid.js
const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    watchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Watch',
        required: true
    },
    bidAmount: {
        type: Number,
        required: true
    },
    bidderName: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bid', bidSchema);