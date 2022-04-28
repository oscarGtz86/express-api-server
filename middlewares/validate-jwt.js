/**
 * Middleware to validate JWT
 * @author Oscar Escamilla
 * @date 10.02.2022
 */
const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require('../models/user');

/**
 * To validate Bearer token
 * @param {string} "authorization" Header that contains token
 */
const validateJWT = async ( req = request, res = response, next ) => {
    req.logger.debug(req.headers);
    const header = req.headers.authorization;

    // If header is empty or incorrect authentication
    if ( !header || header.indexOf('Bearer ') === -1) {
        req.logger.warn('Invalid Header');
        return res.status(401).json({
            msg: 'No authorized'
        });
    }

    try {
        const [, token] = header.split(' ');
        const { uid } = jwt.verify( token, process.env.SECRET ); // Verify token

        req.uid = uid; // Set mongo _id

        const user = await User.findById( uid );

        if ( !user ) { // If user not exists
            req.logger.warn('Invalid user');
            return res.status(401).json({
                msg: 'No authorized'
            });
        }

        if ( !user.status ) { // If user status is invalid
            req.logger.warn([1,2,3]);
            req.logger.warn("Invalid user's status");
            return res.status(401).json({
                msg: 'No authorized'
            });
        }
        
        req.user = user;
        next();

    } catch (error) {
        req.logger.warn('Invalid token');
        return res.status( 401 ).json({
            msg: 'No authorized'
        });
    }
}

module.exports = {
    validateJWT,
}