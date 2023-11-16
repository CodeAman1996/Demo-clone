const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

exports.createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        next(error);
    }
}

exports.getHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 999 }
        }).limit(req.query.limit);

        res.status(200), json(hotels);
    }
    catch (error) {

    }

}

exports.countByCity = async (req, res, next) => {
    const cities = req.query.city.split(',');
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city })
            })
        )
        res.status(200), json(list);
    }
    catch (error) {
        next(error);
    }
}

exports.countHotelByType = async (req, res, next) => {

    try {
        const hotelcount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentcount = await Hotel.countDocuments({ type: "apartments" })
        const resortcount = await Hotel.countDocuments({ type: "resort" })
        const villacount = await Hotel.countDocuments({ type: "villa" })
        const cabincount = await Hotel.countDocuments({ type: "cabin" })
        res.status(200), json([

            { type: 'hotel', count: hotelcount },
            { type: 'apartment', count: apartmentcount },
            { type: 'resort', count: resortcount },
            { type: 'villa', count: villacount },
            { type: 'cabin', count: cabincount }

        ]);
    }
    catch (error) {
        next(error);
    }
}

exports.getHotelrooms = async (req, res, next) => {

    try {
        const hotel = await Hotel.findById(req.params.id)

        const roomList = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room);
            })

        )
        res.status(200), json(roomList);
    }
    catch (error) {
        next(error);
    }
}