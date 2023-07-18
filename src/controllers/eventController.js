const eventServices = require('../services/eventServices');

//funcion para obtener todos los eventos
const getAllEvents = async (req, res) => {
    try{
        const events = await eventServices.getAllEvents();
        if(events.length === 0){
            return res.status(404).json({error: 'No se encontraron eventos en la base de datos'});
        }
        res.status(200).json(events); // si encuentra eventos, los devuelve como respuesta en formato json
    }catch(err){
        console.error('Error al obtener los eventos:', err);
        res.status(400).json({error: 'Error al obtener los eventos de la base de datos'});
    }
};

//función para crear un evento
const createEvent = async (req, res) => {
    try{
        const eventSaved = await eventServices.createEvent(req, res);
        console.log('Evento creado correctamente', eventSaved);
        res.status(201).json(eventSaved);
    }catch(err){
        console.error('Error al crear el evento:', err);
        throw new Error('Error al crear el evento en la base de datos');
    }
};

//función para obtener un evento por su id
const getEventById = async (req, res) => {
    const eventId = req.params.id; //obtiene el id del evento de la url (params)
    try{
        const event = await eventServices.getEventById(eventId);
        if(!event){
            return res.status(404).json({error: 'Evento no encontrado'});
        }
        res.status(200).json(event);
    }catch(err){
        console.error('Error al obtener el evento:', err);
        res.status(400).json({error: 'Error al obtener el evento de la base de datos'});
    }
};

//función para actualizar un evento por su id
const updateEventById = async (req, res) => {
    const eventId = req.params.id;
    try{
        const updateEvent = await eventServices.updateEventById(eventId, req.body);//req.body: contiene los datos del evento a actualizar
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
    try{
        const deleteEvent = await eventServices.deleteEventById(eventId);
        if(!deleteEvent){
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
};