const express = require('express');
const connectDB = require('./db');
const eventRouter = require('./router/eventRouter');

const app = express();

connectDB()

app.use(express.json()); //middleware para analizar el cuerpo de las solicitudes entrantes

app.use('/Events', eventRouter);

app.listen(3000, () => console.log('Server is running on port 3000'));
