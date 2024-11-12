const express = require('express');
const FamilyRouter = express.Router()
const Middleware = require('../middleware/Middleware')


const FamilyController = require('../controllers/Family/FamilyController')

FamilyRouter.post('/create', Middleware.jwtAuth, FamilyController.create)
FamilyRouter.post('/get', Middleware.jwtAuth, FamilyController.get)


module.exports = FamilyRouter