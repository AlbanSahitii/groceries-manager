const express = require('express');
const UserRouter = express.Router()


const UserController = require('../controllers/User/UserController.js')

UserRouter.get('/register', UserController.register)


module.exports = UserRouter