const express = require('express');
const FamilyRouter = express.Router()
const Middleware = require('../middleware/Middleware')


const FamilyController = require('../controllers/Family/FamilyController')

FamilyRouter.post('/create', Middleware.jwtAuth, FamilyController.create)
FamilyRouter.get('/get', Middleware.jwtAuth, FamilyController.get)
FamilyRouter.put('/update', Middleware.jwtAuth, FamilyController.update) 
FamilyRouter.delete('/delete', Middleware.jwtAuth, FamilyController.delete) 
FamilyRouter.post('/add_user', Middleware.jwtAuth, FamilyController.addUser) 


module.exports = FamilyRouter