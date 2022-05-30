/**
 * Express server class
 * @author Oscar Escamilla
 * @date 02.02.2022
 */
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('../helpers/winston'); // Winston logger
const { dbConnection } = require('../database/config');
const { auth, users } = require('../routes');
const { loggingPath, setUUID, loggingUUID, loggingResponse } = require('../middlewares');

/**
 * Server class contains listen method, routes and middlewares
 */
class Server {

    /**
     * Create Server
     */
    constructor () {
        this.port = process.env.PORT;
        this.app = express();

        // Paths
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        // Connect to MongoDB
        this.dbConnection(logger);

        // Set middlewares
        this.middlewares();

        // Set routes
        this.routes();
    }

    /**
     * Connect to MongoDB
     */
    async dbConnection (logger) {
        await dbConnection(logger);
    }

    /**
     * Middlewares
     */
    middlewares () {
        // Use gzip compression
        this.app.use( compression() );

        // Use helmet default config
        // https://www.npmjs.com/package/helmet
        // https://helmetjs.github.io/
        // this.app.use( helmet() );

        // CORS
        this.app.use(cors())

        // Inyect and log UUID v4 
        this.app.use( setUUID );
        this.app.use( loggingUUID );
        this.app.use( loggingResponse );
        
        // Morgan logging
        this.app.use(morgan(process.env.MORGAN_STRING, { stream: logger.stream }));

        // For parsing application/json
        this.app.use( express.json() );

        // Serving static content
        this.app.use( express.static( 'public' ) );

        // Handlebars
        this.app.set( 'view engine', 'hbs' );
        
        // Logging
        this.app.use( (req, res, next) => {
            req.winston = logger;
            next();
        });

        // Logging IP, method and path
        this.app.use( loggingPath );
    }

    /**
     * Server routes
     */
    routes () {
        // Serving default page
        this.app.get( '/', (req, res) =>{
            res.render('404');
        } )

        this.app.use( this.authPath, auth ); // To get authentication token
        this.app.use( this.usersPath, users ); // User's CRUD operations

        // Set 404
        this.app.use( (req, res) => {
            res.status( 404 ).render( '404' );
        });

        // Error handler
        this.app.use( (err, req, res, next) => {
            console.error( err.stack );
            res.status( 500 ).render( '500' );
        });
    }

    /**
     * Start server
     */
    listen () {
        this.app.listen( this.port, () => {
            logger.info(`Running server on port ${this.port}`);
        } );
    }

}

module.exports = Server;