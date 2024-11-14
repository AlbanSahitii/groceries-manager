const express = require('express')
const PurchasedGroceriesRouter = express.Router()
const Middlware = require('../middleware/Middleware')

const PurchasedGroceriesController = require('../controllers/Groceries/PurchasedGroceriesController')

PurchasedGroceriesRouter.get('/get', PurchasedGroceriesController.get)
PurchasedGroceriesRouter.put('/update', PurchasedGroceriesController.update)
PurchasedGroceriesRouter.delete('/delete', PurchasedGroceriesController.delete)
PurchasedGroceriesRouter.post('/create', PurchasedGroceriesController.create)

module.exports= PurchasedGroceriesRouter