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
        throw new Error('Error al guardar el evento en la base de datos');
    }
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

//función para obtener un evento por su id
const getEventById = async (eventId) => {
    try{
        const event = await Event.findById(eventId);
        if(!event){
            return null; //si no encuentra el evento, devuelve null
        };
        console.log('Evento encontrado:', event);
        return event; //si encuentra el evento, lo devuelve
    }catch(err){
        console.error('Error al obtener el evento:', err);
        throw new Error('Error al obtener el evento de la base de datos');
    }
};

//función para actualizar un evento por su id
const updateEventById = async (eventId, eventData) => {
    try{//findByIdAndUpdate: Busca un documento por su id y lo actualiza y {new: true} devuelve el documento actualizado
        const updateEvent = await Event.findByIdAndUpdate(eventId, eventData, {new: true});
        if(!updateEvent){
            return null; //si no encuentra el evento, devuelve null
        }
        console.log('Evento actualizado:', updateEvent);
       return updateEvent; //devuelve el evento actualizado si lo encuentra
    }catch(err){
        console.error('Error al actualizar el evento:', err);
        throw new Error('Error al actualizar el evento en la base de datos');
    }
};

//funcion para actualizar parcialmente un evento por su id
const updatePartialEventById = async (eventId, eventData) => {
    try{
        const updateEvent = await Event.findByIdAndUpdate(eventId, eventData, {new: true});
        if(!updateEvent){
            return null;
        }
        console.log('Evento actualizado:', updateEvent);
        return updateEvent;
    }catch(err){
        console.error('Error al actualizar el evento:', err);
        throw new Error('Error al actualizar el evento en la base de datos');
    }
};

//función para eliminar un evento por su id
const deleteEventById = async (eventId) => { //recibe el id del evento
    try{ //findByIdAndDelete: Busca un documento por su id y lo elimina
        const eventDeleted = await Event.findByIdAndDelete(eventId);
        if(!eventDeleted){
            return null; //si no encuentra el evento, devuelve null
        }
       console.log('Evento eliminado:', eventDeleted);
         return eventDeleted; //devuelve el mensaje de evento eliminado si lo encuentra y lo elimina
    }catch(err){
        console.error('Error al eliminar el evento:', err);
        throw new Error('Error al eliminar el evento en la base de datos');
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEventById,
    updatePartialEventById,
    deleteEventById,
    validateCreateEvent,
    logRequest,
};