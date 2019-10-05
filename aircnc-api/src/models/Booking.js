const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    spot:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'spot'
    }
});

module.exports = mongoose.model('booking',BookingSchema);