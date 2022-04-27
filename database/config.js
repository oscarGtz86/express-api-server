/**
 * Mongoose config file
 * @author Oscar Escamilla
 * @date 02.02.2022
 */

const mongoose = require("mongoose")

const dbConnection = async (logger) => {
    try {
        // Use encodeURIComponent if the password contains $,#,@
        await mongoose.connect( process.env.DB_URL );
        // console.log('Database connected');
        logger.info('Database connected');
    } catch (error) {
        logger.error( error.stack );
        logger.error('Unable to connect to database');
        process.exit(1);
    }
}

module.exports = {
    dbConnection
}