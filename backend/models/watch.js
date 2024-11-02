const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true,
        enum: ['new', 'used', 'refurbished', 'not working']
    },
    starting_bid: {
        type: Number,
        required: true
    },
    auction_end_time: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Watch', watchSchema);