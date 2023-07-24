const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/login', customerController.loginUser);
router.post('/logout', customerController.logoutUser); //ruta para desloguear un usuario

module.exports = router;