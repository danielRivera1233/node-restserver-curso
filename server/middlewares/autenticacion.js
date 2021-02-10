const jwt = require('jsonwebtoken');



/**
 *  Verifica token
 */

let verificaToken = ( req, res, next ) => {

    let token = req.get('token');
    console.log('SEED = ' + process.env.SEED);

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido o null'
                }
            });
        }
        console.log('TOKEN = ' + token);
        req.usuario = decoded.usuario;
        next();
    });
};

/**
 * Verifica admin role
 */

let verificaAdminRole = ( req, res, next ) => {
    let usuario = req.usuario;

    if ( usuario.role === 'ADMIN_ROLE') {
        next();
    }else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es admin, para actualizar registros.'
            }
        });
    }
}


module.exports = {
    verificaToken, verificaAdminRole
}