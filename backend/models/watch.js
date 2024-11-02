const mongoose = require('mongoose');

const WatchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    condition: { type: String, required: true },
    starting_bid: { type: Number, required: true },
    auction_end_time: { type: Date, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Watch', WatchSchema);