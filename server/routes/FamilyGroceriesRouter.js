const express= require('express')
const FamilyGroceriesRouter = express.Router()

const FamilyGroceriesController = require('../controllers/Family/FamilyGroceriesController')

FamilyGroceriesRouter.get('/get', FamilyGroceriesController.get)
FamilyGroceriesRouter.delete('/delete', FamilyGroceriesController.delete)
FamilyGroceriesRouter.post('/create', FamilyGroceriesController.create)
FamilyGroceriesRouter.put('/update', FamilyGroceriesController.update)

module.exports = FamilyGroceriesRouter