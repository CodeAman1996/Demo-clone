const express = require('express');
const router = require('express').Router();
const { createHotel } = require('../controllers/hotel');
const { updateRoomAvailability } = require('../controllers/room');

router.post('/', createHotel);
router.post('/updateRoomavaialability', updateRoomAvailability);

module.exports = router;