/**
 * Logging middleware
 * @author Oscar Escamilla
 * @date 30.05.2022
 */

const { Resquest, Response } = require('express');
const morgan = require('morgan');

/**
 * Logging path
 * @param {Resquest} req Express request
 * @param {Response} res Express response
 * @param {function} next Express next fucntion
 */
const loggingPath = (req = Resquest, res = Response, next) => {
    req.logger.info(
        `${req.ip} ${req.protocol} ${req.method} ${req.originalUrl} ${req.headers['user-agent']}`);
    next();
};

/**
 * Logging morgan response
 * @param {Resquest} req Express request
 * @param {Response} res Express response
 * @param {function} next Express next fucntion
 */
 const loggingResponse = (req = Resquest, res = Response, next) => {
    morgan.token('uuid', function(req, res) {
        return req.uuid;
    });
    next();
};

module.exports = {
    loggingPath,
    loggingResponse,
}