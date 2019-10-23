const express = require('express');
const HomeController = require('../controllers/home');

const router = express.Router();

router.get('/', HomeController.home_get_all)

module.exports = router;
