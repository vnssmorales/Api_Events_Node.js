const express = require('express');
const connectDB = require('./db');
const eventRouter = require('./router/eventRouter');
const customerRouter = require('./router/customerRouter');
const authRouter = require('./router/authRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors'); //middleware para habilitar CORS
const cookieParser = require('cookie-parser');

const app = express();

//habilita CORS para todas las rutas
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));

connectDB()

app.use(cookieParser());//middleware para analizar las cookies de las solicitudes entrantes

 //middleware para analizar el cuerpo de las solicitudes entrantes con formato JSON y la convierte en un objeto JavaScript
app.use(express.json());

//rutas de la API
app.use('/Events', eventRouter);
app.use('/customer', customerRouter);
app.use('/auth', authRouter);

//ruta para la documentación de la API
//middleware para servir archivos estáticos
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//middleware para manejar errores
app.listen(3000, () => console.log('Server is running on port 3000'));

//CORS es una medida de seguridad que evita que un dominio (origen) haga peticiones HTTP a otro dominio diferente,
// a menos que se configure explícitamente el acceso.
