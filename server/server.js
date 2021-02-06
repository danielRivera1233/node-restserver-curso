require('./config/config.js');

const express = require('express');
const mongoose = require('mongoose');

const app = express();


const bodyParser = require('body-parser')

const prueba = '/usuario'; 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use( require('./controllers/usuario') ) 

mongoose.connect( process.env.URLDB,
                 { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
                (err, res) => {
    
    if( err ) throw new err;

    console.log("Base de datos Online");
});

app.listen(process.env.PORT, () => {
    console.log('Escuchado en el puento: ', process.env.PORT);
});
