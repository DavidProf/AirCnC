const Booking = require('../models/Booking');


module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date
        });

        await booking.populate('spot').populate('user').execPopulate();

        //part of funcionality with but not web socket, get owner spot
        const ownerSocket = req.connectedUsers[booking.spot.user];
        
        if(ownerSocket){//If socket exists
            req.io.to(ownerSocket).emit('booking_request',booking);
        }

        return res.json(booking);
    }
};