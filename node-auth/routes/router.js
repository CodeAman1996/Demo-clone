
const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const { loginwithotp, login, webnavigation } = controller;
const { verifyToken } = require('../middleware/verifyToken');


router.post('/login-with-otp', loginwithotp);

router.post('/login', login);

router.get('/web-navigation', verifyToken, webnavigation);

module.exports = router;