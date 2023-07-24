const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Customer = require('../models/customerModel');

const secretKey = 'secret-key'; //clave secreta para firmar el token
const tokenBlacklist = new Set(); //lista negra para almacenar los tokens inválidos

//metodo para crear un token al iniciar sesión
const createToken = (user) => { //recibe el usuario que se loguea
    const payload = { //payload: datos que se van a guardar en el token
        id: user._id,
        email: user.email,
        role: user.rol,
    };
    const token = jwt.sign(payload, secretKey, {expiresIn: '1h'}); //sign: firma el token con la clave secreta y le agrega una expiración de 1 hora
    return token;
}

//metodo para verificar las credenciales al iniciar sesión
const login = async (req, res) => {//recibe el email y la contraseña que se ingresan al iniciar sesión
    const {usuario, contraseña} = req.body;
    try{
        //busca el usuario por su email en la base de datos
        const user = await Customer.findOne({ usuario });
        //si no encuentra el usuario, devuelve un mensaje de error
        if(!user){
            return res.status(401).json({error: 'credenciales incorrectas'});
        }
        //compara la contraseña ingresada con la contraseña encriptada en la base de datos
        const validPassword = await bcrypt.compare(contraseña, user.contraseña); //compare: compara la contraseña ingresada con la contraseña encriptada en la base de datos
        //si la contraseña no es válida, devuelve un mensaje de error
        if(!validPassword){
            return res.status(401).json({error: 'Contraseña incorrecta'});
        }
        //si la contraseña es válida, crea y devuelve un token
        const token = createToken(user);
        //establecer la cookie en la respuesta
        res.cookie('token', token, {httpOnly: true, maxAge: 3600000, secure: true}); //httpOnly: la cookie no es accesible desde el cliente, maxAge: expiración en miliseg, secure: la cookie solo se envía a través de https
        return res.status(200).json({token});
    }catch(err){
        console.error('Error al iniciar sesión:', err);
       return res.status(500).json({error: 'Error al iniciar sesión'});
    }
}

//metodo para desloguear un usuario

module.exports = {
    createToken,
    login,
};