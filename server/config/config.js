



/**
 Puerto
**/
process.env.PORT = process.env.PORT || 3000;


/**
 Entorno de desarrollo.
**/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


/**
 * Base de datos
**/

let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://127.0.0.1:27017/cafe';
} else {
    console.log('Base de datos ONLINE')
    urlDB = process.env.MONGO_URI;
}


/**
 *  Vencimiento del token:
 *  60 segundos
 *  60 minutos
 *  24 horas
 *  30 dias
 */
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

/**
 * SEED de autenticación
 */
process.env.SEED = process.env.SEED = process.env.SEED || 'este_es_el_seed_desarrollo';


process.env.URLDB = urlDB;