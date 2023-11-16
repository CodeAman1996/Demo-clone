const express = require('express');
const router = require('express').Router();

const { login } = require('../../src/controller/logincontroller');

router.post('/login', login);
module.exports = router;