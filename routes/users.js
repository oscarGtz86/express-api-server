/**
 * Routing user paths
 * @author Oscar Escamilla
 * @date 02.02.2022
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, postUser, putUser, deleteUser } = require('../controller/users');
const { emailExists, ifIdExists } = require('../helpers/validators');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = new Router();

/**
 * GET users method
 * @param path
 * @param controllers
 */
router.get( '/', [
    check('limit', 'Limit is not a number').isNumeric(),
    check('startAt', 'Start is not a number').isNumeric(),
    validateFields,
], getUsers);

/**
 * POST user method
 * @param path
 * @param controllers
 */
router.post( '/', [
    check( 'name', 'Name is required' ).notEmpty(),
    check( 'password', 'Password is required' ).notEmpty(),
    check( 'email', 'Invalid email' ).isEmail(),
    check( 'email' ).custom( emailExists ),
    validateFields,
], postUser);

/**
 * Put user method
 */
router.put( '/:id', [
    validateJWT,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom( ifIdExists ),
    validateFields,
], putUser);

/**
 * Delete user method
 */
router.delete( '/:id', [
    validateJWT,
    check( 'id', 'Not a valid id' ).isMongoId(),
    check( 'id' ).custom( ifIdExists ),
    validateFields,
], deleteUser );

module.exports = router;