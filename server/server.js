require('./config/config.js');

const express = require('express');
const mongoose = require('mongoose');

const app = express();


const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Configuración global de todas las rutas.
app.use( require('./controllers/index') )


mongoose.connect( process.env.URLDB,
                 { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true },
                (err, res) => {
    
    if( err ) {
        console.error(err);
        throw new err;
    }

    console.log("Base de datos Online");
});

app.listen(process.env.PORT, () => {
    console.log('Escuchado en el puento: ', process.env.PORT);
});
