/**
 * Custom validations
 * @author Oscar Escamilla
 * @date 02.02.2022
 */
const User = require('../models/user');

/**
 * Validate if email exists
 * @param {string} email User's email
 */
const emailExists = async ( email = '' ) => {
    const userExists = await User.findOne({ email });
    if ( userExists ) {
        throw new Error(`Email ${email} already exists`);
    }
}

/**
 * 
 * @param {MongoId} _id Mongo _id
 */
const ifIdExists = async (id) => {
    const idExists = await User.findById( id );
    if ( !idExists ) {
        throw new Error(`Id ${id} not found`);
    }
}

module.exports = {
    emailExists,
    ifIdExists,
}