const express = require('express');
const router = require('express').Router();
const {tc} = require('../controller/tenantcontroller');
const { tenantmiddleware }= require('../middlware/tenantmiddleware');

router.get('/tenant/:tenantId/data',tenantmiddleware,tc);

module.exports= router;