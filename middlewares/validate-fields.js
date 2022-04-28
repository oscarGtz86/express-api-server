/**
 * Implement all middlewares
 * @author Oscar Escamilla
 * @date 02.02.2022
 */
const { request, response } = require("express");
const { validationResult } = require("express-validator");

/**
 * 
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {function} next Express next function
 * @returns JSON with validation errors
 */
const validateFields = (req = request, res = response, next) => {
    const errors = validationResult(req); // Extracts the validation errors
    if ( !errors.isEmpty() ) { // If errors exists then return them
        req.logger.warn(errors);
        return res.status( 400 ).json( errors );
    }
    next();
}

module.exports = {
    validateFields
}