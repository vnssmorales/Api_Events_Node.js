const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const validations = require('../middlewares/validationsCustomer');


router.post('/create', validations.validateCreateCustomer ,customerController.createCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/:id', validations.validateGetById ,customerController.getCustomerById);
router.put('/:id', validations.validateUpdateCustomer ,customerController.updateCustomerById);
router.patch('/:id', customerController.updatePartialCustomerById);
router.delete('/:id', validations.validateDeleteCustomer ,customerController.deleteCustomerById);
//router.get('/current', );

module.exports = router;