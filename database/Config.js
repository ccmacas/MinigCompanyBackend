const mongoose = require('mongoose');

const connection = mongoose.connect(
    'mongodb://localhost:27017/MinigCompany'/*'mongodb+srv://celiamacas24:4bjUWRLzea9GibaJ@minig.soqbw3p.mongodb.net/MinigCompany?retryWrites=true&w=majority&appName=Minig '*/, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB', err));

module.exports = connection;