//middleware para registrar y seguimiento de las solicitudes
const logRequest = (req, res, next) => {
    console.log('Se ha recibido una petición:', req.method, req.url);
    next();
};

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

//middleware para analizar la eliminacion de un evento (delete)
const validateDeleteEvent = (req, res, next) => {
    const eventId = req.params.id;
    //verifica que el id del evento no sea 0 o string vacío
    if(eventId === 0 || eventId === ''){
        return res.status(400).json({error: 'Debe ingresar un id de evento válido'});
    }
    //si el id del evento es válido, pasa al siguiente middleware o función de manejo de rutas
    next();
};

//middleware para analizar la actualización de un evento (put)
const validateUpdateEvent = (req, res, next) => {
    const eventId = req.params.id;
    const {name, category, date} = req.body;
    //verifica que el id del evento no sea 0 o string vacío
    if(eventId === 0 || eventId === ''){
        return res.status(400).json({error: 'Debe ingresar un id de evento válido'});
    }
    //verifica que los campos obligatorios no estén vacíos
    if(!name || !category || !date){
        return res.status(400).json({error: 'Debe completar los campos obligatorios. Nombre, categoría y fecha del evento.'});
    }
    //si el id del evento es válido y los campos requeridos están completos, pasa al siguiente middleware o función de manejo de rutas  
    next();
};

//middleware para analizar la obtención de un evento por su id (getById)
const validateGetById = (req, res, next) => {
    const eventId = req.params.id;
    //verifica que el id del evento no sea 0 o string vacío
    if(eventId === 0 || eventId === ''){
        return res.status(400).json({error: 'Debe ingresar un id de evento válido'});
    }
    //si el id del evento es válido, pasa al siguiente middleware o función de manejo de rutas
    next();
};

module.exports = {
    validateCreateEvent,
    logRequest,
    validateDeleteEvent,
    validateUpdateEvent,
    validateGetById,
};