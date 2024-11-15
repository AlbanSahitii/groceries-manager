const express = require('express');
const FamilyRouter = express.Router()
const Middleware = require('../middleware/Middleware')


const FamilyController = require('../controllers/Family/FamilyController');
const FamilyGroceriesController = require('../controllers/Family/FamilyGroceriesController');

FamilyRouter.post('/create', FamilyController.create)
FamilyRouter.get('/get', FamilyController.get)
FamilyRouter.put('/update', FamilyController.update) 
FamilyRouter.delete('/delete', FamilyController.delete) 
FamilyRouter.post('/add_user', FamilyController.addUser)
FamilyRouter.get('/get_members', FamilyController.getMembers) 


module.exports = FamilyRouter