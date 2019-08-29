const express = require('express');
const HomeController = require('../controllers/home');

const router = express.Router();

router.get('/', HomeController.home_get_all)
      .post('/', HomeController.create_home)
      .delete('/:homeId', HomeController.delete_home)

module.exports = router;
