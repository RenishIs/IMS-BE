'use strict'

const router = require('express').Router();
const middleware = require('../helper/middleware');

const user = require('../controllers/user');

router.post('/signup', user.signup);
router.post("/login", user.login);

module.exports = router;