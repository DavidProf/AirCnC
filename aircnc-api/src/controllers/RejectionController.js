const Booking = require('../models/Booking');


module.exports = {
    async store(req, res) {
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = false;

        await booking.save();
        //part of funcionality with but not web socket, get owner spot
        const bookingUserSocket = req.connectedUsers[booking.user];

        if (bookingUserSocket) {//If socket exists
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }
        return res.json(booking);
    }
}