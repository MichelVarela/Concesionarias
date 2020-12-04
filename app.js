const express = require('express');
const app = express();

//RUTAS
const homePage = require('./routes/homePage');
const sucursales = require('./routes/sucursales');
const marcas = require('./routes/marcas');
const autos = require('./routes/autos');

//ENLACES
app.use('/', homePage);
app.use('/sucursales', sucursales);
app.use('/marcas', marcas);
app.use('/autos', autos);

app.listen(3030, () => console.log('Servidor funcionando en el puerto 3030'));