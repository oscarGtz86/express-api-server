/**
 * Export all middlewares
 * @author Oscar Escamilla
 * @date 30.05.2022
 */

const logging = require('./logging');
const uuidv4 = require('./uuidv4');
const validateFields = require('./validate-fields');
const validateJWT = require('./validate-jwt');

module.exports = {
    ...logging,
    ...uuidv4,
    validateFields,
    validateJWT,
}