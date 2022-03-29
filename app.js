/**
 * Entrypoint app.js
 * @author Oscar Escamilla
 * @date 02.02.2022
 */
require('dotenv').config();
const Server = require('./models/server');

// Start server
const app = new Server();
app.listen();

// TODO: Basic Auth
// TODO: Integrate Winston
// TODO: helmet and compress production notes