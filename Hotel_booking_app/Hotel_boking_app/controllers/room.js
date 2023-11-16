const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const { createError } = require('../utils/error');

exports.createHotel = async (req, res, next) => {
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id }
            })
        }

        catch (error) {
            next(error)
        }
    }
    catch (error) {
        next(error)
    }
}

exports.updateRoomAvailability = async () => {
    try {
        await Room.updateOne(
            { 'roomnumber._id': req.params.id },
            {
                $push: {
                    "roomNumber.$unavailableDates": req.body.dates
                },
            }
        )
        res.status(200).json('Room status has been updated');
    }
    catch (error) {

    }


}
