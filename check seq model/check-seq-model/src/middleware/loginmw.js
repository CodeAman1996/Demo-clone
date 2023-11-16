const knex = require('knex');
const router = require('express').Router();
const { sign } = require('../controller/logincontroller');
//const { log } = require('../controller/logincontroller');

router.post('/signup', sign);
//router.post('/login', log);

module.exports = router;