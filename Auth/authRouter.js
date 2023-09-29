const express = require('express');
const { userSignup } = require('./authController');
const { SignUpValidationSchema } = require('../middlewares/userValidation')

const router = express.Router();

router.post('/signup', SignUpValidationSchema, userSignup) // create a new user
// router.post('/login', userLogin) // user login


const authRoutes = router;

module.exports = { authRoutes };