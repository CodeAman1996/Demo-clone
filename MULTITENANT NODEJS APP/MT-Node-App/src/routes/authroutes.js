const express = require('express');
const router = require('express').Router();


const { resolve } = require('../../src/middleware/connectionresolver');

router.post('/login', resolve)

module.exports = router;