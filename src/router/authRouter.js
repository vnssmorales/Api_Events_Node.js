const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const auth = require('../middlewares/auth');

router.post('/login', customerController.loginUser);
router.post('/logout',auth.authenticateToken, customerController.logoutUser); //ruta para desloguear un usuario


module.exports = router;