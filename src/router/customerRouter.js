const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/create', customerController.createCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.put('/:id', customerController.updateCustomerById);
router.patch('/:id', customerController.updatePartialCustomerById);
router.delete('/:id', customerController.deleteCustomerById);

module.exports = router;