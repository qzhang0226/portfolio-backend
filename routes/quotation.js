const express = require('express');
const QuotationController = require('../controllers/quotation');

const router = express.Router();
const upDateHome = require('../middlewares/update-home');

router.get('/', QuotationController.quotation_get_all)
      .post('/', QuotationController.create_quotation)
      .delete('/:quotationId', QuotationController.delete_quotation)
      .patch('/:quotationId', QuotationController.update_quotation)
      // .patch('/:quotationId', QuotationController.update_quotation, upDateHome)

module.exports = router;
