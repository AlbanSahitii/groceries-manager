const express = require('express');
const UserRouter = express.Router()


const Middleware = require('../middleware/Middleware')
const UserController = require('../controllers/User/UserController')

UserRouter.post('/register', UserController.register)
UserRouter.post('/login', UserController.login)
UserRouter.delete('/delete',Middleware.jwtAuth, UserController.delete)
UserRouter.put('/update', Middleware.jwtAuth, UserController.update)


module.exports = UserRouter