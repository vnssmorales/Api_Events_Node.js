const mongoose = require("mongoose");
const Customer = require("../models/customerModel");

// Expresión regular para validar el formato de correo electrónico y la contraseña
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

//middleware para analizar la creación de un usuario (post)
const validateCreateCustomer = (req, res, next) => {
    const {usuario, contraseña, email} = req.body;
    console.log("Datos recibidos:", usuario, contraseña, email);
    //verifico que los campos obligatorios no estén vacíos
    if(!usuario || !contraseña || !email){
        return res.status(400).json({error: 'Debe completar los campos obligatorios. Usuario, contraseña y email.'});
    }
    //verifico que el formato del email sea válido
    if(!emailRegex.test(email)){ //utilizo el método test de las expresiones regulares
        return res.status(400).json({error: 'El formato del email es inválido'});
    }
    //verifico que la contraseña cumpla con los requisitos: al menos 1 mayúscula, 1 caracter especial, 1 número y long minima 8 caracteres
    if(!passwordRegex.test(contraseña)){
        return res.status(400).json({error: 'La contraseña debe tener al menos 1 mayúscula, 1 caracter especial, 1 número y long minima 8 caracteres'});
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
    //verifico que el formato del email sea válido
    if(!emailRegex.test(email)){
        return res.status(400).json({error: 'El formato del email es inválido'});
    }
    //verifico que la contraseña cumpla con los requisitos
    if(!passwordRegex.test(contraseña)){
        return res.status(400).json({error: 'La contraseña debe tener al menos 1 mayúscula, 1 caracter especial, 1 número y long minima 8 caracteres'});
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