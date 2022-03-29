/**
 * To genererate JWT sync
 */
const jwt = require('jsonwebtoken');

/**
 * 
 * @param {string} uid MongoDB _id as a payload
 * @returns jwt
 */
const generateJWT = ( uid = '' ) => {
    const payload = { uid };
    // Synchronous Sign
    return jwt.sign( payload, process.env.SECRET, { expiresIn: '4h' });
    // Sign asynchronously
    /* return new Promise( (resolve, reject) => {
        const payload = { uid };
        jwt.sign( payload, process.env.SECRET, {
            expiresIn: '4h'
        }, ( error, token) => {
            if ( error ) {
                console.log( error );
                reject( error );
            } else {
                resolve( token );
            }
        } )
    }); */
}

module.exports = {
    generateJWT
}