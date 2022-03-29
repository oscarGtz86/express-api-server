/**
 * Authentication route
 * @author Oscar Escamilla
 * @date 09.02.2022
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { token } = require("../controller/auth");
const { validateFields } = require("../middlewares/validate-fields");

const router = new Router();

/**
 * POST method to get token
 * @param {string} email User's email
 * @param {string} password User's password
 */
router.post( '/token', [
    check('email', 'Invalid email' ).isEmail(),
    check('password', 'Invalid password' ).notEmpty(),
    validateFields,
], token );

module.exports = router;