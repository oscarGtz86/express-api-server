/**
 * Users controller
 * @author Oscar Escamilla
 * @date 02.02.2022
 *
 * ┌───────────┬──────────┐
 * | HTTP Verb | CRUD     |
 * ├───────────┼──────────┤
 * | POST      | Create   |
 * ├───────────┼──────────┤
 * | GET       | Read     |
 * ├───────────┼──────────┤
 * | PUT       | Update   |
 * ├───────────┼──────────┤
 * | DELETE    | Delete   |
 * └───────────┴──────────┘
 */

const bcrypt = require('bcryptjs');
const { request, response } = require("express");
const User = require('../models/user');

/**
 * Find users
 * @param {number} limit Max number of users returned
 * @param {number} startAt Skip query parameter
 */
const getUsers = async (req = request, res = response, next) => {
    try {
        const { limit, startAt } = req.query; // Get query
    
        const [ total, users ] = await Promise.all([
            User.countDocuments({ status: true }),
            User.find({ status: true })
                .skip( Number( startAt ) )
                .limit( Number( limit ) )
        ]);
        
        res.status( 200 ).json({
            total,
            users
        });
    } catch (error) {
        next( error );
    }
}

/**
 * Save user into database
 * @param {string} name User's name
 * @param {string} email User's email
 */
const postUser = async (req = request, res = response, next) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email });

        // Encrypt password
        const salt = bcrypt.genSaltSync(); // Salt, default 10
        user.password = bcrypt.hashSync( password, salt ); // Hash password
    
        await user.save(); // Save into db

        res.status( 201 ).json( user ); // HTTP status 201 (Created)
    } catch (error) {
        next( error );
    }
}

/**
 * Update user
 * @param {string} id Mongo _id
 * @param {string} name User's name
 * @param {string} email User's email
 * @param {string} status User's email
 */
const putUser = async (req = request, res = response, next) => {
    try {
        const { id } = req.params; // Get id from URL path
        const { name, email, status } = req.body;

        const user = await User.findByIdAndUpdate(id, { name, email, status }, { new: true });
        res.status(200).json( user );
    } catch (error) {
        next( error ); // Throws error handler
    }
}

/**
 * Delete user
 * @param {string} id Mongo _id
 */
const deleteUser = async (req = request, res = response, next) => {
    try {
        const { id } = req.params;
        req.logger.info(`Deleting ${id}`);
        // const user = await User.findByIdAndDelete( id ); // If you need to delete document
        const user = await User.findByIdAndUpdate( id, { status: false }, { new: true } );
        res.status( 200 ).json( user );
    } catch (error) {
        next( error ); // Throws error handler
    }

}

module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser,   
}