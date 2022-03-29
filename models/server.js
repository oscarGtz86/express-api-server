/**
 * Express server class
 * @author Oscar Escamilla
 * @date 02.02.2022
 */
const express = require('express');
const morgan = require('morgan');
const { dbConnection } = require('../database/config');
const { auth, users } = require('../routes');

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
        this.dbConnection();

        // Set middlewares
        this.middlewares();

        // Set routes
        this.routes();
    }

    /**
     * Connect to MongoDB
     */
    async dbConnection () {
        await dbConnection();
    }

    /**
     * Middlewares
     */
    middlewares () {
        // Morgan log
        this.app.use( morgan('combined') );

        // For parsing application/json
        this.app.use( express.json() );

        // Serving static content
        this.app.use( express.static( 'public' ) );

        // Handlebars
        this.app.set( 'view engine', 'hbs' );

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
            console.log(`Running server on port ${this.port}`);
        } );
    }

}

module.exports = Server;