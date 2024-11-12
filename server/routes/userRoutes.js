const express = require('express');
const UserRouter = express.Router()


const UserController = require('../controllers/User/UserController')

UserRouter.post('/register', UserController.register)
UserRouter.post('/login', UserController.login)
UserRouter.delete('/delete', UserController.delete)


module.exports = UserRouter