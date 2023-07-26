const customerServices = require('../services/customerServices');
const auth = require('../middlewares/auth');

//controlador para iniciar sesión
const loginUser = async (req, res) => {
    try{
        await auth.login(req, res);
    }catch(err){
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({error: 'Error al iniciar sesión'});
    }
}

//controlador para desloguear un usuario
const logoutUser = async (req, res) => {
    try{
        //obtener el token de las cookies de la solicitud
        const token = req.cookies.token;
        //invalidar el token agregándolo a la lista negra
        auth.logout(token);
        //limpiar la cookie del token
        res.clearCookie('token', {httpOnly: true, secure: true});
        //devolver una respuesta exitosa
        res.status(200).json({message: 'Usuario deslogueado correctamente'});
    }catch(err){
        console.error('Error al desloguear el usuario:', err);
        res.status(500).json({error: 'Error al desloguear el usuario'});
    }
};

//función para crear un usuario
const createCustomer = async (req, res) => {
    try{
        console.log('Datos recibidos en el controlador:', req.body);
        const {userSaved, token} = await customerServices.createCustomer(req, res);
        console.log('Usuario creado correctamente', userSaved);
        res.status(201).json({userSaved, token});
    }catch(err){
        console.error('Error al crear el usuario:', err);
        res.status(400).json({error: 'Error al crear el usuario en la base de datos'});
    }
};

//funcion para obtener todos los usuarios
const getAllCustomers = async (req, res) => {
    try{
        console.log(req.cookies.token)
        const users = await customerServices.getAllCustomers();
        if(users.length === 0){
            return res.status(404).json({error: 'No se encontraron usuarios en la base de datos'});
        }
      //  console.log('Usuarios encontrados:', users);
        res.status(200).json({users: users}); // si encuentra usuarios, los devuelve como respuesta en formato json
    }catch(err){
        console.error('Error al obtener los usuarios:', err);
        res.status(400).json({error: 'Error al obtener los usuarios de la base de datos'});
    }
};

//función para obtener un usuario por su id
const getCustomerById = async (req, res) => {
    const customerId = req.params.id; //obtiene el id del usuario de la url (params)
    try{
        const user = await customerServices.getCustomerById(customerId);
        if(!user){
            return res.status(404).json({error: 'Usuario no encontrado'});
        }
        res.status(200).json(user);
    }catch(err){
        console.error('Error al obtener el usuario:', err);
        res.status(400).json({error: 'Error al obtener el usuario de la base de datos'});
    }
};

//función para actualizar un usuario por su id
const updateCustomerById = async (req, res) => {
    const customerId = req.params.id;
    try{
        const updateCustomer = await customerServices.updateCustomerById(customerId, req.body);//req.body: contiene los datos del usuario a actualizar
        if(!updateCustomer){
            return res.status(404).json({error: 'Usuario no encontrado'});
        }
        res.status(200).json(updateCustomer);
    }catch(err){
        console.error('Error al actualizar el usuario:', err);
        res.status(400).json({error: 'Error al actualizar el usuario en la base de datos'});
    }
};

//funcion para actualizar parcialmente un usuario por su id
const updatePartialCustomerById = async (req, res) => {
    const customerId = req.params.id;
    try{
        const updateCustomer = await customerServices.updatePartialCustomerById(customerId, req.body);//req.body: contiene los datos del usuario a actualizar
        if(!updateCustomer){
            return res.status(404).json({error: 'Usuario no encontrado'});
        }
        res.status(200).json(updateCustomer);
    }catch(err){
        console.error('Error al actualizar el usuario:', err);
        res.status(400).json({error: 'Error al actualizar el usuario en la base de datos'});
    }
};

//función para eliminar un usuario por su id
const deleteCustomerById = async (req, res) => {
    const customerId = req.params.id;
    try{
        const deleteCustomer = await customerServices.deleteCustomerById(customerId);
        if(!deleteCustomer){
            return res.status(404).json({error: 'Usuario no encontrado'});
        }
        res.status(200).json({message: 'Usuario eliminado correctamente'});
    }catch(err){
        console.error('Error al eliminar el usuario:', err);
        res.status(400).json({error: 'Error al eliminar el usuario en la base de datos'});
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomerById,
    updatePartialCustomerById,
    deleteCustomerById,
    loginUser,
    logoutUser
};