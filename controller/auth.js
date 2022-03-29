/**
 * Authentication controller
 * @author Oscar Escamilla
 * @date 10.02.2022
 */

const bcryptjs = require("bcryptjs");
const { response, request } = require("express");
const jwt = require('jsonwebtoken');
// const { generateJWT } = require("../helpers/generate-jwt");
const User = require('../models/user');

/**
 * JWT method
 * @param {string} email User's email
 * @param {string} password User's password
 */
const token = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if ( !user ) { // If user not exists
            console.warn(`User ${email}, invalid email`);
            return res.status(401).json({
                msg: 'Unable to login'
            });
        }

        if ( !user.status ) { // If user is disable
            console.warn(`User ${email}, invalid status`);
            return res.status(401).json({
                msg: 'Unable to login'
            });
        }

        // Validate password
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            console.warn(`User ${email}, invalid password`);
            return res.status(401).json({
                msg: 'Unable to login'
            });
        }

        // const token = await generateJWT( user.id ); // Generate JWT
        const token = jwt.sign( { uid: user.id }, process.env.SECRET, { expiresIn: '4h' });

        res.json({
            // user,
            token,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Unable to login'
        });
    }
}

module.exports = {
    token
}