const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const eventServices = require('../services/eventServices');

router.use(eventController.logRequest); //middleware logRequest (se ejecuta para todas las rutas

router.post('/create', eventServices.validateCreateEvent, eventController.createEvent); //middleware validateCreateEvent
router.get('/:id', eventController.getEventById);
router.get('/', eventController.getAllEvents);
router.put('/:id', eventController.updateEventById);
router.patch('/:id', eventController.updatePartialEventById);
router.delete('/:id', eventController.deleteEventById);

module.exports = router;