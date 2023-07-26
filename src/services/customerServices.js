const mongoose = require('mongoose');
const Customer = require('../models/customerModel');
const bcrypt = require('bcrypt');
const { createToken } = require('../middlewares/auth');

//función para crear un usuario
const createCustomer = async (req, res) => {
    const {usuario, contraseña,rol, email} = req.body;
    try{
        //encriptar la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(contraseña, 10); //hash: encripta la contraseña, 10: número de veces que se aplica el algoritmo de encriptación
       
        const customer = new Customer({
            _id: new mongoose.Types.ObjectId(),
            usuario,
            contraseña: hashedPassword, //guarda la contraseña encriptada
            rol,
            email,
        });

        const customerSaved = await customer.save(); //guarda el usuario en la base de datos
        console.log('Usuario guardado en la base de datos:', customerSaved);
        //si el usuario se crea correctamente, generamos el token
        const token = createToken(customerSaved);
        return { user: customerSaved, token}; //retorna el usuario guardado
    }catch(err){
        console.error('Error al guardar el usuario:', err);
        throw new Error('Error al guardar el usuario en la base de datos');
    }
};

//función para obtener todos los usuarios
const getAllCustomers = async () => {
    try{
        const customers = await Customer.find(); //obtiene todos los usuarios de la base de datos
        if(customers.length === 0){
            return null;
        }
       // console.log('Usuarios encontrados:', customers);
        return customers; //retorna los usuarios encontrados
    }catch(err){
        console.error('Error al obtener los usuarios:', err);
        throw new Error('Error al obtener los usuarios de la base de datos');
    }
};

//función para obtener un usuario por su id
const getCustomerById = async (customerId) => {
    try{
        const user = await Customer.findById(customerId); //obtiene el usuario de la base de datos
        if(!user){
            return null;
        };
        console.log('Usuario encontrado:', user);
        return user; //retorna el usuario encontrado
    }catch(err){
        console.error('Error al obtener el usuario:', err);
        throw new Error('Error al obtener el usuario de la base de datos');
    }
};

//función para actualizar un usuario por su id
const updateCustomerById = async (customerId, customerBody) => {
    try{
        const updateCustomer = await Customer.findByIdAndUpdate(customerId, customerBody, {new: true}); //actualiza el usuario en la base de datos
        if(!updateCustomer){
            return null;
        }
        console.log('Usuario actualizado:', updateCustomer);
        return updateCustomer; //retorna el usuario actualizado
    }catch(err){
        console.error('Error al actualizar el usuario:', err);
        throw new Error('Error al actualizar el usuario en la base de datos');
    }
};

//funcion para actualizar parcialmente un usuario por su id
const updatePartialCustomerById = async (customerId, customerBody) => {
    try{
        const updateCustomer = await Customer.findByIdAndUpdate(customerId, customerBody, {new: true});
        if(!updateCustomer){
            return null;
        }
        console.log('Usuario actualizado:', updateCustomer);
        return updateCustomer;
    }catch(err){
        console.error('Error al actualizar el usuario:', err);
        throw new Error('Error al actualizar el usuario en la base de datos');
    }
};

//función para eliminar un usuario por su id
const deleteCustomerById = async (customerId) => {
    try{
        const deleteCustomer = await Customer.findByIdAndDelete(customerId); 
        if(!deleteCustomer){
            return null;//si no encuentra el usuario, retorna null
        }
        console.log('Usuario eliminado:', deleteCustomer);
        return deleteCustomer; //retorna el mensaje de usuario eliminado
    }catch(err){
        console.error('Error al eliminar el usuario:', err);
        throw new Error('Error al eliminar el usuario de la base de datos');
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomerById,
    updatePartialCustomerById,
    deleteCustomerById,
};