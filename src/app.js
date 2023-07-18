const express = require('express');
const connectDB = require('./db');
const eventRouter = require('./router/eventRouter');
const bodyParser = require('body-parser');

const app = express();

connectDB()

 //middleware para analizar el cuerpo de las solicitudes entrantes con formato JSON y la convierte en un objeto JavaScript
app.use(express.json());

app.use('/Events', eventRouter);

app.listen(3000, () => console.log('Server is running on port 3000'));
