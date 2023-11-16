const express = require('express');
const router = require('express').Router();
const { createHotel } = require('../controllers/hotel');

router.post('/', createHotel);

module.exports = router;
