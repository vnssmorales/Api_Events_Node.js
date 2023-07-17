const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/create', eventController.validateCreateEvent, eventController.createEvent); //middleware validateCreateEvent
router.get('/:id', eventController.getEventById);
router.get('/', eventController.getAllEvents);
router.put('/:id', eventController.updateEventById);
router.delete('/:id', eventController.deleteEventById);

module.exports = router;