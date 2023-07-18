const express = require('express');
const connectDB = require('./db');
const eventRouter = require('./router/eventRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const path = require('path');

const app = express();

connectDB()

 //middleware para analizar el cuerpo de las solicitudes entrantes con formato JSON y la convierte en un objeto JavaScript
app.use(express.json());

//rutas de la API
app.use('/Events', eventRouter);

//ruta para la documentación de la API
const swaggerPath = path.join(__dirname, 'swagger.json');
//console.log('Ruta absoluta de swagger.json:',absolutePath);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//middleware para servir archivos estáticos
app.use('/api-docs',express.static(swaggerPath));//utilizo  swaggerPath para servir el archivo swagger.json

//middleware para manejar errores
app.listen(3000, () => console.log('Server is running on port 3000'));
