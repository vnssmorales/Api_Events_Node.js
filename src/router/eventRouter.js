const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const validations = require('../middlewares/validationsEvents');

router.use(validations.logRequest); //middleware logRequest (se ejecuta para todas las rutas

router.post('/create', validations.validateCreateEvent , eventController.createEvent); //middleware validateCreateEvent
router.get('/:id', validations.validateGetById ,eventController.getEventById);
router.get('/',eventController.getAllEvents);
router.put('/:id', validations.validateUpdateEvent ,eventController.updateEventById);
router.patch('/:id', eventController.updatePartialEventById);
router.delete('/:id', validations.validateDeleteEvent ,eventController.deleteEventById);

module.exports = router;