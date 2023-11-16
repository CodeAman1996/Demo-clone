const express = require('express');
const router = require('express').Router();


const { register } = require('../../src/controller/signincontroller');

router.post('/register', register)

module.exports = router;