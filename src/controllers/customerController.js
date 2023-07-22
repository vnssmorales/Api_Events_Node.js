const customerServices = require('../services/customerServices');

//función para crear un usuario
const createCustomer = async (req, res) => {
    try{
        const userSaved = await customerServices.createCustomerc(req, res);
        console.log('Usuario creado correctamente', userSaved);
        res.status(201).json(userSaved);
    }catch(err){
        console.error('Error al crear el usuario:', err);
        res.status(400).json({error: 'Error al crear el usuario en la base de datos'});
    }
};

module.exports = {
    createCustomer,
};