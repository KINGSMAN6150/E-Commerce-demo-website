// In backend/models/watch.js

const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    condition: {
        type: String,
        required: true,
        enum: ['new', 'used', 'refurbished', 'not working']
    },
    starting_bid: {
        type: Number,
        required: true,
        min: 0
    },
    current_bid: {
        type: Number,
        default: function() {
            return this.starting_bid;
        }
    },
    auction_end_time: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > new Date();
            },
            message: 'Auction end time must be in the future'
        }
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Watch', watchSchema);