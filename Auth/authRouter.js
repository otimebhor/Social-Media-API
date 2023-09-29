const express = require('express');
const { userSignup, userLogin } = require('./authController');
const { SignUpValidationSchema, LoginValidationSchema } = require('../middlewares/userValidation')

const router = express.Router();

router.post('/signup', SignUpValidationSchema, userSignup) // create a new user
router.post('/login', LoginValidationSchema, userLogin) // user login


const authRoutes = router;

module.exports = { authRoutes };