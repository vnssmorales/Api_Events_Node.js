const mongoose = require("mongoose");
const Customer = require("../models/customerModel");

//middleware para analizar la creación de un usuario (post)
const validateCreateCustomer = (req, res, next) => {
    const {usuario, contraseña, email} = req.body;
    //verifico que los campos obligatorios no estén vacíos
    if(!usuario || !contraseña || !email){
        return res.status(400).json({error: 'Debe completar los campos obligatorios. Usuario, contraseña y email.'});
    }
    //si todos los campos requeridos están completos, pasa al siguiente middleware o función de manejo de rutas
    next();
};

//middleware para analizar la eliminacion de un usuario (delete)
const validateDeleteCustomer = (req, res, next) => {
    const customerId = req.params.id;
    //verifico que el id del usuario no sea 0 o string vacío
    if(customerId === 0 || customerId === ''){
        return res.status(400).json({error: 'Debe ingresar un id de usuario válido'});
    }
    next();
};

//middleware para analizar la actualización de un usuario (put)
const validateUpdateCustomer = (req, res, next) => {
    const customerId = req.params.id;
    const {usuario, contraseña, email} = req.body;
    //verifico que el id del usuario no sea 0 o string vacío
    if(customerId === 0 || customerId === ''){
        return res.status(400).json({error: 'Debe ingresar un id de usuario válido'});
    }
    //verifico que los campos obligatorios no estén vacíos
    if(!usuario || !contraseña || !email){
        return res.status(400).json({error: 'Debe completar los campos obligatorios. Usuario, contraseña y email.'});
    }
    next();
};

//middleware para analizar la obtención de un usuario por su id (getById)
const validateGetById = (req, res, next) => {
    const customerId = req.params.id;
    //verifico que el id del usuario no sea 0 o string vacío
    if(customerId === 0 || customerId === ''){
        return res.status(400).json({error: 'Debe ingresar un id de usuario válido'});
    }
    next();
};

module.exports = {
    validateCreateCustomer,
    validateDeleteCustomer,
    validateUpdateCustomer,
    validateGetById,
};