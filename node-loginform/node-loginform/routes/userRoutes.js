//importing modules
const express = require('express')
const router = express.Router()
const userAuth = require('../middleware/auth')
const controller = require('../controllers/controller')

const { signup } = controller;
const  { login }   = controller;

//login route
router.post('/login', login )

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup)

module.exports = router