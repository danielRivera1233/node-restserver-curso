require('./config/config.js');

const express = require('express');
const app = express();


const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const prueba = '/usuario';
const pruebaPut = '/usuario/:id';



app.get(prueba, function (req, res) {
    console.log(`Ejecutando el servicio ${prueba}`);
    res.json('getUsuario');
});


app.post(prueba, function (req, res) {
    let body = req.body;
    console.log(`Ejecutando el servicio ${prueba}`);
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            message: 'El nombre es necesario'
        });
    }else{
        res.json({
            persona : body
        });
    }
});


app.put(pruebaPut, function (req, res) {
    let id = req.params.id;
    console.log(`Ejecutando el servicio ${prueba}`);
    res.json({
        id
    });
});

app.delete(prueba, function (req, res) {
    console.log(`Ejecutando el servicio ${prueba}`);
    res.json('delete Usuario');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchado en el puento: ', process.env.PORT);
});
