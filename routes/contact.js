const express = require('express');
const ContactController = require('../controllers/contact');

const router = express.Router();

router.get('/', ContactController.contact_get_all)
      .post('/', ContactController.create_contact)
      .delete('/:contactId', ContactController.delete_contact)
      .patch('/:contactId', ContactController.update_contact)

module.exports = router;
