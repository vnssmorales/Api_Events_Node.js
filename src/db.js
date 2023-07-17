const mongoose = require('mongoose');
const uri ='mongodb://localhost:27017/Eventos';

const connect = () => {
    //useNewUrlParser: true, indica a Mongoose que use el nuevo motor de conexión
    //useUnifiedTopology: true, indica a Mongoose que use el nuevo motor de descubrimiento y monitoreo del servidor
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB is connected'))
    .catch(err => console.error('Error connecting to mongodb' + err));
};

module.exports = connect;