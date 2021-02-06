



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

if ( process.env.NODE_ENV === 'devs' ) {
    urlDB = 'mongodb://127.0.0.1:27017/cafe';
} else {
    urlDB = 'mongodb+srv://daniel_admin:M8YCx7qdiGaEdZnt@cluster0.sshl5.mongodb.net/cafe';
}

process.env.URLDB = urlDB;