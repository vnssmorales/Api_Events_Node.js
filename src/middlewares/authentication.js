const jwt = require('jsonwebtoken');

const secretKey = 'secret-key'; //clave secreta para firmar el token

//middleware para verificar el token
const authenticateToken = (req, res, next) => {
    const token = req.headers['autorización']?.split(' ')[1]; //obtiene el token de los headers de la solicitud
    if(!token){
        return res.status(401).json({error: 'Acceso no autorizado. No se ha enviado un token de autorización'});
    }
    //si el token existe, verifica que sea válido
    try{
        const tokenDecoded = jwt.verify(token, secretKey); //verifica el token con la clave secreta
        req.user = tokenDecoded; //guarda el token decodificado en el objeto de solicitud (req)
        next();
    }catch(err){
        console.error('Error al verificar el token:', err);
        return res.status(401).json({error: 'Acceso no autorizado. Token inválido'});
    }
};

module.exports = {
    authenticateToken,
};