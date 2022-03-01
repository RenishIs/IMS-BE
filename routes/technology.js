'use strict'

const router = require('express').Router();

const technology = require('../controllers/technology');

router.post('/create', technology.addTechnology);
router.delete("/:id", technology.delete);
router.get("/", technology.getTechnologies);

module.exports = router;