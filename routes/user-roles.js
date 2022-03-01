'use strict'

const router = require('express').Router();

const user = require('../controllers/user-roles');

router.get('/', user.get);


module.exports = router;
