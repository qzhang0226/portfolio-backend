const express = require('express');
const QuotationController = require('../controllers/quotation');

const router = express.Router();

router.get('/', QuotationController.quotation_get_all)
      .post('/', QuotationController.create_quotation)
      .delete('/:quotationId', QuotationController.delete_quotation)
      .patch('/:quotationId', QuotationController.update_quotation)

module.exports = router;
