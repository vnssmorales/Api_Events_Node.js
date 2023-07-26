const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Customer = require('../models/customerModel');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.SECRET_KEY; //GUARDADO EN .ENV
const tokenBlacklist = new Set(); //lista negra para almacenar los tokens inválidos

//metodo para crear un token al iniciar sesión
const createToken = (user) => { //recibe el usuario que se loguea
    const payload = { //payload: datos que se van a guardar en el token
        id: user._id,
        email: user.email,
    };
    console.log(secretKey)
    const token = jwt.sign(payload, secretKey, {expiresIn: '1h'}); //sign: firma el token con la clave secreta y le agrega una expiración de 1 hora
    return token;
}

//metodo para verificar las credenciales al iniciar sesión
const login = async (req, res) => {//recibe el email y la contraseña que se ingresan al iniciar sesión
    const {email, contraseña} = req.body;
    try{
       // console.log(req.body)
        //busca el usuario por su email en la base de datos
        const user = await Customer.findOne({ email: email });
        //si no encuentra el usuario, devuelve un mensaje de error
        if(!user){
            return res.status(401).json({error: 'usuario no encontrado en la base de datos'});
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
        res.cookie('token', token).send('cookie establecida'); 
        //return res.status(200).json({token});
    }catch(err){
        console.error('Error al iniciar sesión:', err);
       return res.status(500).json({error: 'Error al iniciar sesión'});
    }
}

//metodo para desloguear un usuario
const logout = (token) => {//elimina la cookie del token
    tokenBlacklist.add(token);
};
//middleware para verificar el token y comprobar si ha sido invalidado
const authenticateToken = (req, res, next) => {
   const token = req.cookies.token; //obtiene el token de las cookies de la solicitud
   console.log(req.cookies)
   if(!token){
    res.redirect('/login');
    }
    //si el token existe, verifica que sea válido
    if(tokenBlacklist.has(token)){ //has: verifica si un elemento existe en un Set
        res.redirect('/login');
    }
    try{
        const tokenDecoded = jwt.verify(token, secretKey); //verifica el token con la clave secreta
       if(tokenDecoded){
        next();
       }else{
        res.redirect('/login');
       }
    }catch(err){
        console.error('Error al verificar el token:', err);
        return res.status(401).json({error: 'Acceso no autorizado. Token inválido'});// ERROR 500
    }
};

module.exports = {
    createToken,
    login,
    logout,
    authenticateToken,
};