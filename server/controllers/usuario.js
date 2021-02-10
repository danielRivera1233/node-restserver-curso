const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

const app = express();

const prueba = '/usuario';
const pruebaPut = '/usuario/:id';
const pruebaDelete = '/usuarioD/:id';

app.post(prueba, [verificaToken, verificaAdminRole], (req, res) => {
    console.log(`Ejecutando el servicio POST ${prueba}`);
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save( (err, usuarioDB) => {
        if (err){
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
});


app.get(prueba, verificaToken, (req, res) => {
    console.log(`Ejecutando el servicio GET ${prueba}`);

    let filters = req.headers.filters;
    console.log(`Filters -> ${filters}`);

    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado : true }, 'nombre email google role estado img')
        .skip(desde)
        .limit(limite)
        .exec( (err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado : true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos : conteo
                });
            });
        });
});


app.put(pruebaPut, [verificaToken, verificaAdminRole], (req, res) => {
    console.log(`Ejecutando el servicio PUT -> ${prueba}`);
    let id = req.params.id;
    let body = _.pick( req.body, ['nombre', 'email', 'img', 'role', 'estado'] );

    Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario : usuarioDB
        });

    });
});


app.delete(pruebaDelete, [verificaToken, verificaAdminRole], (req, res) => {
    console.log(`Ejecutando el servicio DELETE ${pruebaDelete}`);

    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado ) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if( !usuarioBorrado ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado.'
                }
            });
        }

        res.json({
            ok: true,
            usuario : usuarioBorrado
        });

    });

});


app.delete(pruebaPut, [verificaToken, verificaAdminRole], (req, res) => {
    console.log(`Ejecutando el servicio DELETE ${pruebaPut}`);

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate( id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario : usuarioBorrado
        });

    });

});


module.exports = app;