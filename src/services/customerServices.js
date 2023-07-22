const mongoose = require('mongoose');
const Customer = require('../models/customerModel');

//función para crear un usuario
const createCustomer = async (req, res) => {
    const customer = new Customer({ //crea un nuevo usuario
        _id : new mongoose.Types.ObjectId(),
        usuario: req.body.usuario,
        contraseña: req.body.contraseña,
        rol: req.body.rol,
        email: req.body.email,
    }); 
    try{
        const customerSaved = await customer.save(); //guarda el usuario en la base de datos
        console.log('Usuario guardado en la base de datos:', customerSaved);
        return customerSaved; //retorna el usuario guardado
    }catch(err){
        console.error('Error al guardar el usuario:', err);
        throw new Error('Error al guardar el usuario en la base de datos');
    }
};

module.exports = {
    createCustomer,
};