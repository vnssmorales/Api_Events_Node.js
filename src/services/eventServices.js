const mongoose = require('mongoose');
const Event = require('../models/eventModel');

//Middleware para analizar el cuerpo de las solicitudes de creación de un evento
const validateCreateEvent = (req, res, next) => {
    const {name, category, date} = req.body;
    //verifica que los campos obligatorios no estén vacíos
    if(!name || !category || !date){
        return res.status(400).json({error: 'Debe completar los campos obligatorios. Nombre, categoría y fecha del evento.'});
    }
    //si todos los campos requeridos están completos, pasa al siguiente middleware o función de manejo de rutas
    next();
};

//middleware para registrar las solicitudes
const logRequest = (req, res, next) => {
    console.log('Se ha recibido una petición:', req.method, req.url);
    next();
};

//función para obtener todos los eventos
const getAllEvents = async (req, res) => {
    try{
        const events = await Event.find();
        //si no encuentra eventos, devuelve un mensaje de error
        if(events.length === 0){
            return null;
        }
        return events // si encuentra eventos, los devuelve como respuesta en formato json
    }catch(err){
        console.error('Error al obtener los eventos:', err);
       throw new Error ('Error al obtener los eventos de la base de datos');
    }
};

//función para crear un evento
const createEvent = async (req, res) => {
    const event = new Event({
        _id: new mongoose.Types.ObjectId(), 
        name: req.body.name,
        category: req.body.category,
        date: req.body.date,
        description: req.body.description,
        image: req.body.image,
        place: req.body.place,
        price: req.body.price,
        capacity: req.body.capacity,
        assistance: req.body.assistance,
        estimate: req.body.estimate,
    });
    try {
        const eventSaved = await event.save();
        console.log('Evento guardado en la base de datos:', eventSaved);
        return eventSaved; //retorna el evento guardado(para que no aparezca undefined en la consola en createEvent de controllers/eventController.js)
    }catch(err){
        console.error('Error al guardar el evento:', err);
        res.status(400).json({error: 'Error al guardar el evento en la base de datos'});
    }
};

//función para obtener un evento por su id
const getEventById = async (req, res) => {
    const eventId = req.params.id; //obtiene el id del evento de la url (params)
    try{
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({error: 'Evento no encontrado'});
        };
        console.log('Evento encontrado:', event);
        res.status(200).json(event);
    }catch(err){
        console.error('Error al obtener el evento:', err);
        res.status(400).json({error: 'Error al obtener el evento de la base de datos'});
    }
};

//función para actualizar un evento por su id
const updateEventById = async (req, res) => {
    const eventId = req.params.id;
    try{//findByIdAndUpdate: Busca un documento por su id y lo actualiza y {new: true} devuelve el documento actualizado
        const updateEvent = await Event.findByIdAndUpdate(eventId, req.body, {new: true});
        if(!updateEvent){
            return res.status(404).json({error: 'Evento no encontrado'});
        }
        res.status(200).json(updateEvent);
    }catch(err){
        console.error('Error al actualizar el evento:', err);
        res.status(400).json({error: 'Error al actualizar el evento en la base de datos'});
    }
};

//función para eliminar un evento por su id
const deleteEventById = async (req, res) => {
    const eventId = req.params.id;
    try{ //findByIdAndDelete: Busca un documento por su id y lo elimina
        const eventDeleted = await Event.findByIdAndDelete(eventId);
        if(!eventDeleted){
            return res.status(404).json({error: 'Evento no encontrado'});
        }
        res.status(200).json({message: 'Evento eliminado correctamente'});
    }catch(err){
        console.error('Error al eliminar el evento:', err);
        res.status(400).json({error: 'Error al eliminar el evento de la base de datos'});
    }
};

module.exports = {
    getAllEvents,
    createEvent,
    getEventById,
    updateEventById,
    deleteEventById,
    validateCreateEvent,
    logRequest,
};