const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const validations = require('../middlewares/validationsCustomer');
const authMiddleware = require('../middlewares/authentication');

//rutas protegidas con el middleware de autenticación
router.post('/create', authMiddleware.authenticateToken ,validations.validateCreateCustomer ,customerController.createCustomer);
router.get('/:id', authMiddleware.authenticateToken ,validations.validateGetById ,customerController.getCustomerById);
router.put('/:id', authMiddleware.authenticateToken, validations.validateUpdateCustomer ,customerController.updateCustomerById);
router.delete('/:id', authMiddleware.authenticateToken, validations.validateDeleteCustomer ,customerController.deleteCustomerById);


router.get('/', customerController.getAllCustomers);
router.patch('/:id', customerController.updatePartialCustomerById);


module.exports = router;