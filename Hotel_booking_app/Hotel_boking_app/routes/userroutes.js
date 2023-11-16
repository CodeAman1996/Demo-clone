const express = require('express');
const router = require('express').Router();

const { updateUser, DeleteUser, getUser, getAllUsers } = require('../controllers/users.js');
const { verifyAdmin, verifyuser } = require('../Middlewares/verifyToken.js');

//update

router.put('/:id', updateUser);
router.delete('/:id', DeleteUser);
router.get('/:id', getUser);
router.get('/', getAllUsers);

module.exports = router;